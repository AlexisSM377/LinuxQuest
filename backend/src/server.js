import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import questRoutes from './routes/quests.js';
import achievementRoutes from './routes/achievements.js';
import npcRoutes from './routes/npcs.js';
import enemyRoutes from './routes/enemies.js';
import leaderboardRoutes from './routes/leaderboard.js';
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

// ========== SECURITY MIDDLEWARE ==========

// Helmet.js - Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'wss:', 'ws:']
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));

// CORS - Strict policy
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};
app.use(cors(corsOptions));

// Rate limiting global - 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes, intenta más tarde',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', globalLimiter);

// JSON parsing con limites
app.use(express.json({ limit: '10mb' }));

// Strict transport security (HTTPS)
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/npcs', npcRoutes);
app.use('/api/enemies', enemyRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

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
