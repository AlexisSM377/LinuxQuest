import pool from '../db.js';

class UserProgress {
  static async getByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY lesson_id ASC',
      [userId]
    );
    return result.rows;
  }

  static async markComplete(userId, lessonId) {
    const result = await pool.query(
      `INSERT INTO user_progress (user_id, lesson_id, completed, completed_at)
       VALUES ($1, $2, true, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, lesson_id) DO UPDATE SET completed = true, completed_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, lessonId]
    );
    return result.rows[0];
  }

  static async getProgress(userId, lessonId) {
    const result = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1 AND lesson_id = $2',
      [userId, lessonId]
    );
    return result.rows[0];
  }
}

export default UserProgress;
