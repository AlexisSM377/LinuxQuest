import express from 'express';
import pool from '../db.js';
import Quest from '../models/Quest.js';
import Progress from '../models/Progress.js';
import { verifyToken } from '../middleware/auth.js';
import levelSystem from '../utils/levelSystem.js';

const router = express.Router();

// Obtener todas las quests
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.findAll();
    res.json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ error: 'Error fetching quests' });
  }
});

// Obtener quest por ID
router.get('/:id', async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ error: 'Error fetching quest' });
  }
});

// Obtener quests por mundo
router.get('/world/:worldId', async (req, res) => {
  try {
    const quests = await Quest.findByWorld(req.params.worldId);
    res.json(quests);
  } catch (error) {
    console.error('Error fetching world quests:', error);
    res.status(500).json({ error: 'Error fetching quests' });
  }
});

// Obtener progreso del usuario
router.get('/user/progress', verifyToken, async (req, res) => {
  try {
    const progress = await Progress.findByUser(req.userId);
    const stats = await Progress.getStats(req.userId);
    res.json({ progress, stats });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// Completar una quest y otorgar XP
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const questId = req.params.id;
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    // Verificar si ya fue completada
    let progress = await Progress.findByUserAndQuest(req.userId, questId);
    if (progress && progress.status === 'completed') {
      return res.status(400).json({ error: 'Quest already completed' });
    }

    if (!progress) {
      progress = await Progress.create(req.userId, questId);
    }

    // Marcar como completada
    const updated = await Progress.updateStatus(req.userId, questId, 'completed');

    // Obtener rewards del quest
    const rewards = quest.rewards || { xp: 0, coins: 0 };
    const xpGained = rewards.xp || 0;
    const coinsGained = rewards.coins || 0;

    // Obtener XP actual del usuario
    const userResult = await pool.query('SELECT xp, level FROM users WHERE id = $1', [req.userId]);
    const oldXp = userResult.rows[0].xp;
    const oldLevel = userResult.rows[0].level;

    // Sumar XP y coins
    const newXp = oldXp + xpGained;
    const newLevel = levelSystem.calculateLevel(newXp);
    const leveledUp = newLevel > oldLevel;

    // Actualizar usuario
    await pool.query(
      'UPDATE users SET xp = $1, level = $2, coins = coins + $3 WHERE id = $4',
      [newXp, newLevel, coinsGained, req.userId]
    );

    res.json({
      success: true,
      progress: updated,
      xpGained,
      coinsGained,
      totalXp: newXp,
      oldLevel,
      newLevel,
      leveledUp,
      xpToNext: levelSystem.getXpToNextLevel(newXp)
    });
  } catch (error) {
    console.error('Error completing quest:', error);
    res.status(500).json({ error: 'Error completing quest' });
  }
});

// Obtener stats del usuario (XP, level, coins)
router.get('/user/stats', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT xp, level, coins FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const xpToNext = levelSystem.getXpToNextLevel(user.xp);
    const progress = levelSystem.getLevelProgress(user.xp);

    res.json({
      xp: user.xp,
      level: user.level,
      coins: user.coins,
      xpToNext,
      progress
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

export default router;
