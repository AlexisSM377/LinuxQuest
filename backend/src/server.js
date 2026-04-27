import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import questRoutes from './routes/quests.js';
import { executeCommand } from './services/commandService.js';
import { createUserSandbox, deleteUserSandbox, getSandboxPath, cleanupUserSandbox } from './services/sandboxService.js';
import auditLogger from './security/auditLogger.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

const userCommandCounts = new Map();
const RATE_LIMIT = 10; // comandos por 10 segundos
const WINDOW_MS = 10000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quests', questRoutes);

// Socket.io middleware para autenticación
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Token requerido'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error('Token inválido'));
  }
});

// Conexión y eventos WebSocket
io.on('connection', (socket) => {
  console.log(`Usuario ${socket.userId} conectado`);
  const sessionStartTime = Date.now();

  // Auditoría: Inicio de sesión
  auditLogger.logSessionStart(socket.userId);

  try {
    const userSandboxDir = createUserSandbox(socket.userId);
    console.log(`Sandbox created: ${userSandboxDir}`);
    auditLogger.logSandboxAccess(socket.userId, 'SANDBOX_CREATE', 'success');
  } catch (error) {
    console.error('Error creating sandbox:', error);
    auditLogger.logSandboxAccess(socket.userId, 'SANDBOX_CREATE', 'failed');
  }

  socket.on('command', async (command, questId, callback) => {
    try {
      // Rate limiting
      const now = Date.now();
      if (!userCommandCounts.has(socket.userId)) {
        userCommandCounts.set(socket.userId, []);
      }

      const userCommands = userCommandCounts.get(socket.userId);
      userCommands.push(now);

      const recentCommands = userCommands.filter(t => now - t < WINDOW_MS);
      userCommandCounts.set(socket.userId, recentCommands);

      if (recentCommands.length > RATE_LIMIT) {
        callback({
          error: `Límite de comandos excedido. Máximo ${RATE_LIMIT} por ${WINDOW_MS / 1000}s.`,
          output: ''
        });
        return;
      }

      const userSandboxDir = getSandboxPath(socket.userId);
      const result = await executeCommand(command, userSandboxDir, questId, socket.userId);
      callback({ error: result.error || '', output: result.output || '' });
    } catch (error) {
      console.error('Command execution error:', error);
      callback({ error: error.message, output: '' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuario ${socket.userId} desconectado`);
    const sessionDuration = Date.now() - sessionStartTime;

    try {
      deleteUserSandbox(socket.userId);
      auditLogger.logSandboxAccess(socket.userId, 'SANDBOX_DELETE', 'success');
    } catch (error) {
      console.error(`Error deleting sandbox for user ${socket.userId}:`, error);
      auditLogger.logSandboxAccess(socket.userId, 'SANDBOX_DELETE', 'failed');
    }

    // Auditoría: Fin de sesión
    auditLogger.logSessionEnd(socket.userId, sessionDuration);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
