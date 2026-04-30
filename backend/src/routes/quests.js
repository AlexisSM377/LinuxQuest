import express from 'express';
import pool from '../db.js';
import Quest from '../models/Quest.js';
import Progress from '../models/Progress.js';
import { verifyToken } from '../middleware/auth.js';
import levelSystem from '../utils/levelSystem.js';
import AchievementChecker from '../utils/achievementChecker.js';
import { ACHIEVEMENTS } from '../config/achievementsConfig.js';

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

// Obtener quests por mundo (ANTES de /:id para evitar shadowing)
router.get('/world/:worldId', async (req, res) => {
  try {
    const quests = await Quest.findByWorld(req.params.worldId);
    res.json(quests);
  } catch (error) {
    console.error('Error fetching world quests:', error);
    res.status(500).json({ error: 'Error fetching quests' });
  }
});

// Obtener progreso del usuario (ANTES de /:id para evitar shadowing)
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

// Obtener stats del usuario (ANTES de /:id para evitar shadowing)
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
    const progressPercent = levelSystem.getLevelProgress(user.xp);

    res.json({
      xp: user.xp,
      level: user.level,
      coins: user.coins,
      xpToNext,
      progress: progressPercent
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// Obtener quest por ID (DESPUÉS de las rutas específicas)
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

// Completar una quest y otorgar XP (con transacción para evitar race conditions)
router.post('/:id/complete', verifyToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const questId = req.params.id;

    // Todas las queries dentro de la transacción usan 'client'
    const questResult = await client.query('SELECT * FROM quests WHERE id = $1', [questId]);
    const quest = questResult.rows[0];

    if (!quest) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Quest not found' });
    }

    // Verificar prerequisites
    if (quest.prerequisites && quest.prerequisites.length > 0) {
      const prereqResult = await client.query(
        `SELECT quest_id FROM user_quest_progress
         WHERE user_id = $1 AND quest_id = ANY($2) AND status = 'completed'`,
        [req.userId, quest.prerequisites]
      );
      const completedIds = prereqResult.rows.map(r => r.quest_id);
      const missing = quest.prerequisites.filter(id => !completedIds.includes(id));

      if (missing.length > 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          error: 'Prerequisites not completed',
          missing,
          message: 'Debes completar las misiones previas para desbloquear esta.'
        });
      }
    }

    // Verificar si ya fue completada
    const progressResult = await client.query(
      'SELECT * FROM user_quest_progress WHERE user_id = $1 AND quest_id = $2',
      [req.userId, questId]
    );
    const existingProgress = progressResult.rows[0];

    if (existingProgress && existingProgress.status === 'completed') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Quest already completed' });
    }

    // Crear o actualizar progreso
    let updated;
    if (!existingProgress) {
      const insertResult = await client.query(
        `INSERT INTO user_quest_progress (user_id, quest_id, status, attempts)
         VALUES ($1, $2, 'completed', 0) RETURNING *`,
        [req.userId, questId]
      );
      updated = insertResult.rows[0];
    } else {
      const updateResult = await client.query(
        `UPDATE user_quest_progress
         SET status = 'completed', completed_at = NOW()
         WHERE user_id = $1 AND quest_id = $2 RETURNING *`,
        [req.userId, questId]
      );
      updated = updateResult.rows[0];
    }

    // Obtener rewards del quest
    const rewards = quest.rewards || { xp: 0, coins: 0 };
    const xpGained = rewards.xp || 0;
    const coinsGained = rewards.coins || 0;

    // Obtener XP actual con FOR UPDATE para prevenir race conditions
    const userResult = await client.query(
      'SELECT xp, level FROM users WHERE id = $1 FOR UPDATE',
      [req.userId]
    );
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found' });
    }
    const oldXp = userResult.rows[0].xp;
    const oldLevel = userResult.rows[0].level;

    // Sumar XP y coins
    let newXp = oldXp + xpGained;
    let newLevel = levelSystem.calculateLevel(newXp);
    const leveledUp = newLevel > oldLevel;

    // Actualizar usuario
    await client.query(
      'UPDATE users SET xp = $1, level = $2, coins = coins + $3 WHERE id = $4',
      [newXp, newLevel, coinsGained, req.userId]
    );

    await client.query('COMMIT');

    const progressPercent = levelSystem.getLevelProgress(newXp);
    const xpToNext = levelSystem.getXpToNextLevel(newXp);

    // Check achievements (fuera de la transacción, no crítico)
    const totalCompletedResult = await pool.query(
      'SELECT COUNT(*) as count FROM user_quest_progress WHERE user_id = $1 AND status = $2',
      [req.userId, 'completed']
    );
    const totalCompleted = parseInt(totalCompletedResult.rows[0].count, 10);

    const newAchievements = await AchievementChecker.checkAchievements(req.userId, {
      questId,
      level: newLevel,
      totalQuests: totalCompleted,
      leveledUp
    });

    // Aplicar XP bonus de achievements
    let achievementBonusXp = 0;
    if (newAchievements.length > 0) {
      await AchievementChecker.saveAchievements(req.userId, newAchievements);

      for (const achId of newAchievements) {
        const ach = ACHIEVEMENTS[achId];
        if (ach?.xp_bonus > 0) {
          achievementBonusXp += ach.xp_bonus;
        }
      }

      if (achievementBonusXp > 0) {
        const bonusResult = await pool.query(
          'UPDATE users SET xp = xp + $1 WHERE id = $2 RETURNING xp, level',
          [achievementBonusXp, req.userId]
        );
        if (bonusResult.rows.length > 0) {
          newXp = bonusResult.rows[0].xp;
          newLevel = bonusResult.rows[0].level;
        }
      }
    }

    res.json({
      success: true,
      questProgress: updated,
      xpGained,
      coinsGained,
      achievementBonusXp,
      totalXp: newXp,
      oldLevel,
      newLevel,
      leveledUp,
      xpToNext,
      progressPercent,
      newAchievements
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error completing quest:', error);
    res.status(500).json({ error: 'Error completing quest' });
  } finally {
    client.release();
  }
});

export default router;
