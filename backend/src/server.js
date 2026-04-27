import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import { executeCommand } from './services/commandService.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

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

  socket.on('command', async (command, callback) => {
    try {
      const result = await executeCommand(command);
      callback({ error: result.error || '', output: result.output || '' });
    } catch (error) {
      console.error('Command execution error:', error);
      callback({ error: error.message, output: '' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuario ${socket.userId} desconectado`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
