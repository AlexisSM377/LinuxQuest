import pool from '../db.js';

class Lesson {
  static async getAll() {
    const result = await pool.query(
      'SELECT id, title, description, difficulty, order_num FROM lessons ORDER BY order_num ASC'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM lessons WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(title, description, content, difficulty, orderNum) {
    const result = await pool.query(
      'INSERT INTO lessons (title, description, content, difficulty, order_num) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, content, difficulty, orderNum]
    );
    return result.rows[0];
  }
}

export default Lesson;
