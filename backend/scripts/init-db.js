import pool from '../src/db.js';

const initializeDatabase = async () => {
  try {
    console.log('Inicializando base de datos...');

    // Crear tipo ENUM para difficulty
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);
    console.log('✓ Tipo ENUM difficulty creado');

    // Crear tabla users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla users creada');

    // Crear tabla lessons
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        difficulty difficulty_enum DEFAULT 'beginner',
        order_num INTEGER NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla lessons creada');

    // Crear tabla user_progress
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, lesson_id)
      );
    `);
    console.log('✓ Tabla user_progress creada');

    // Crear índices
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);`);
    console.log('✓ Índices creados');

    console.log('\n✅ Base de datos inicializada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando BD:', error.message);
    process.exit(1);
  }
};

initializeDatabase();
