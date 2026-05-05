import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  handleValidationErrors,
} from '../middleware/inputValidator.js';
import { sendVerificationEmail } from '../services/emailService.js';

const router = express.Router();

// Cooldown simple en memoria para reenvío (se resetea al reiniciar el servidor)
const resendCooldown = new Map();
const RESEND_COOLDOWN_MS = 60_000;

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

router.post('/register',
  [validateEmail, validateUsername, validatePassword],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'Email ya registrado' });
      }

      const user = await User.create(email, password, username);
      await sendVerificationEmail(email, username, user.verification_token);

      res.status(201).json({
        message: 'Cuenta creada. Revisa tu correo para verificar tu cuenta.',
        email,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Error en registro' });
    }
  }
);

router.post('/login',
  [validateEmail, validatePassword],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const passwordMatch = await User.verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      if (!user.email_verified) {
        return res.status(403).json({
          error: 'Debes verificar tu correo antes de iniciar sesión.',
          code: 'EMAIL_NOT_VERIFIED',
          email: user.email,
        });
      }

      const token = signToken(user);
      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          xp: user.xp || 0,
          level: user.level || 1,
          coins: user.coins || 0,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Error en login' });
    }
  }
);

router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Token requerido' });
    }

    const user = await User.findByVerificationToken(token);
    if (!user) {
      return res.status(400).json({
        error: 'Token inválido o expirado. Solicita un nuevo correo de verificación.',
        code: 'INVALID_TOKEN',
      });
    }

    await User.markEmailVerified(user.id);

    const jwtToken = signToken(user);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        xp: user.xp || 0,
        level: user.level || 1,
        coins: user.coins || 0,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ error: 'Error verificando email' });
  }
});

router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email requerido' });
    }

    const lastSent = resendCooldown.get(email);
    if (lastSent && Date.now() - lastSent < RESEND_COOLDOWN_MS) {
      const waitSec = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - lastSent)) / 1000);
      return res.status(429).json({
        error: `Espera ${waitSec}s antes de solicitar otro correo`,
        code: 'RATE_LIMITED',
      });
    }

    const user = await User.findByEmail(email);
    // Respuesta genérica para evitar enumeración de emails
    if (!user || user.email_verified) {
      return res.json({ message: 'Si el correo existe y no está verificado, recibirás un link.' });
    }

    const newToken = await User.updateVerificationToken(user.id);
    await sendVerificationEmail(email, user.username, newToken);
    resendCooldown.set(email, Date.now());

    res.json({ message: 'Correo de verificación reenviado.' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Error reenviando correo' });
  }
});

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
});

export default router;
