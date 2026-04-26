import pool from '../db.js';
import bcrypt from 'bcrypt';

class User {
  static async create(email, password, username) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id, email, username, created_at',
      [email, hashedPassword, username]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT id, email, username, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default User;
