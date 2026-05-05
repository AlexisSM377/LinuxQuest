import pool from '../db.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const TOKEN_EXPIRY_HOURS = 24;

function generateToken() {
  return randomBytes(32).toString('hex');
}

class User {
  static async create(email, password, username) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateToken();
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    const result = await pool.query(
      `INSERT INTO users (email, password, username, email_verified, verification_token, verification_token_expires_at)
       VALUES ($1, $2, $3, FALSE, $4, $5)
       RETURNING id, email, username, created_at`,
      [email, hashedPassword, username, verificationToken, expiresAt]
    );
    return { ...result.rows[0], verification_token: verificationToken };
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, username, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async findByVerificationToken(token) {
    const result = await pool.query(
      `SELECT * FROM users
       WHERE verification_token = $1
         AND verification_token_expires_at > NOW()
         AND email_verified = FALSE`,
      [token]
    );
    return result.rows[0];
  }

  static async markEmailVerified(userId) {
    await pool.query(
      `UPDATE users
       SET email_verified = TRUE,
           verification_token = NULL,
           verification_token_expires_at = NULL
       WHERE id = $1`,
      [userId]
    );
  }

  static async updateVerificationToken(userId) {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    await pool.query(
      `UPDATE users
       SET verification_token = $1, verification_token_expires_at = $2
       WHERE id = $3`,
      [token, expiresAt, userId]
    );
    return token;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default User;
