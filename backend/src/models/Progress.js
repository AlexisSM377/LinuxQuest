import pool from '../db.js';

export default class Progress {
  static async findByUserAndQuest(userId, questId) {
    const result = await pool.query(
      'SELECT * FROM user_quest_progress WHERE user_id = $1 AND quest_id = $2',
      [userId, questId]
    );
    return result.rows[0];
  }

  static async findByUser(userId) {
    const result = await pool.query(
      'SELECT * FROM user_quest_progress WHERE user_id = $1 ORDER BY quest_id',
      [userId]
    );
    return result.rows;
  }

  static async create(userId, questId) {
    const result = await pool.query(
      `INSERT INTO user_quest_progress (user_id, quest_id, status, attempts)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, questId, 'locked', 0]
    );
    return result.rows[0];
  }

  static async updateStatus(userId, questId, status) {
    const result = await pool.query(
      `UPDATE user_quest_progress
       SET status = $1, completed_at = NOW()
       WHERE user_id = $2 AND quest_id = $3
       RETURNING *`,
      [status, userId, questId]
    );
    return result.rows[0];
  }

  static async incrementAttempts(userId, questId) {
    const result = await pool.query(
      `UPDATE user_quest_progress
       SET attempts = attempts + 1
       WHERE user_id = $1 AND quest_id = $2
       RETURNING *`,
      [userId, questId]
    );
    return result.rows[0];
  }

  static async getStats(userId) {
    const result = await pool.query(
      `SELECT
        status,
        COUNT(*) as count
       FROM user_quest_progress
       WHERE user_id = $1
       GROUP BY status`,
      [userId]
    );
    return result.rows;
  }

  static async checkPrerequisites(userId, prerequisites) {
    if (!prerequisites || prerequisites.length === 0) {
      return { isUnlocked: true, missing: [] };
    }

    const result = await pool.query(
      `SELECT quest_id FROM user_quest_progress
       WHERE user_id = $1 AND quest_id = ANY($2) AND status = 'completed'`,
      [userId, prerequisites]
    );

    const completedIds = result.rows.map(r => r.quest_id);
    const missing = prerequisites.filter(id => !completedIds.includes(id));

    return {
      isUnlocked: missing.length === 0,
      missing
    };
  }
}
