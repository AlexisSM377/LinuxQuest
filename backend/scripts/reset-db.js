import pool from '../src/db.js';

const resetDatabase = async () => {
  try {
    console.log('🗑️  Eliminando todas las tablas...');

    // Drop tables in reverse order of creation (due to foreign keys)
    await pool.query('DROP TABLE IF EXISTS user_achievements CASCADE;');
    await pool.query('DROP TABLE IF EXISTS achievements CASCADE;');
    await pool.query('DROP TABLE IF EXISTS enemies CASCADE;');
    await pool.query('DROP TABLE IF EXISTS user_quest_progress CASCADE;');
    await pool.query('DROP TABLE IF EXISTS quests CASCADE;');
    await pool.query('DROP TABLE IF EXISTS lessons CASCADE;');
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    await pool.query('DROP TYPE IF EXISTS difficulty_enum CASCADE;');

    console.log('✅ Base de datos limpiada');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
};

resetDatabase();
