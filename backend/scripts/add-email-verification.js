import pool from '../src/db.js';

const migrate = async () => {
  try {
    await pool.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
        ADD COLUMN IF NOT EXISTS verification_token_expires_at TIMESTAMP;
    `);
    console.log('✓ Columnas email_verified, verification_token, verification_token_expires_at agregadas');
    process.exit(0);
  } catch (error) {
    console.error('Error en migración:', error.message);
    process.exit(1);
  }
};

migrate();
