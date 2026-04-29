import express from 'express';
import pool from '../db.js';
import { ACHIEVEMENTS } from '../config/achievementsConfig.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all available achievements
router.get('/', async (req, res) => {
  try {
    const achievements = Object.values(ACHIEVEMENTS);
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Error fetching achievements' });
  }
});

// Get user's earned achievements
router.get('/mine', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ua.achievement_id, ua.earned_at
       FROM user_achievements ua
       WHERE ua.user_id = $1
       ORDER BY ua.earned_at DESC`,
      [req.userId]
    );

    const userAchievements = result.rows.map(row => ({
      ...ACHIEVEMENTS[row.achievement_id],
      earned_at: row.earned_at
    }));

    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Error fetching achievements' });
  }
});

// Get achievement details by ID
router.get('/:id', async (req, res) => {
  try {
    const achievement = ACHIEVEMENTS[req.params.id];
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ error: 'Error fetching achievement' });
  }
});

export default router;
