import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get top players by XP
router.get('/top', async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;
    const result = await pool.query(
      `SELECT id, username, level, xp, coins, created_at
       FROM users
       ORDER BY xp DESC, level DESC
       LIMIT $1`,
      [limit]
    );

    const players = result.rows.map((row, index) => ({
      rank: index + 1,
      ...row
    }));

    res.json(players);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
});

// Get player rank and stats
router.get('/player/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Get user stats
    const userResult = await pool.query(
      'SELECT id, username, level, xp, coins FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const user = userResult.rows[0];

    // Get player rank
    const rankResult = await pool.query(
      `SELECT COUNT(*) as rank FROM users WHERE xp > $1`,
      [user.xp]
    );

    const rank = rankResult.rows[0].rank + 1;

    // Get quest completion stats
    const questsResult = await pool.query(
      `SELECT
        COUNT(*) as total_quests,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_quests
       FROM user_quest_progress
       WHERE user_id = $1`,
      [userId]
    );

    const questStats = questsResult.rows[0];

    // Get achievements
    const achievementsResult = await pool.query(
      `SELECT COUNT(*) as total_achievements FROM user_achievements WHERE user_id = $1`,
      [userId]
    );

    const achievements = achievementsResult.rows[0].total_achievements;

    res.json({
      user,
      rank,
      questStats,
      achievements
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Error fetching player stats' });
  }
});

// Get world rankings
router.get('/world/:worldId', async (req, res) => {
  try {
    const worldId = parseInt(req.params.worldId);
    let limit = parseInt(req.query.limit) || 10;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const result = await pool.query(
      `SELECT u.id, u.username, u.level, u.xp,
        COUNT(CASE WHEN uqp.status = 'completed' AND q.world = $1 THEN 1 END) as world_quests
       FROM users u
       LEFT JOIN user_quest_progress uqp ON u.id = uqp.user_id
       LEFT JOIN quests q ON uqp.quest_id = q.id
       GROUP BY u.id, u.username, u.level, u.xp
       HAVING COUNT(CASE WHEN uqp.status = 'completed' AND q.world = $1 THEN 1 END) > 0
       ORDER BY world_quests DESC, u.xp DESC
       LIMIT $2`,
      [worldId, limit]
    );

    const players = result.rows.map((row, index) => ({
      rank: index + 1,
      ...row
    }));

    res.json(players);
  } catch (error) {
    console.error('Error fetching world ranking:', error);
    res.status(500).json({ error: 'Error fetching world ranking' });
  }
});

export default router;
