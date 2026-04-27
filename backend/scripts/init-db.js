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
        xp INT DEFAULT 0,
        level INT DEFAULT 1,
        coins INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla users creada');

    // Agregar columnas si no existen (para usuarios con BD anterior)
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0,
      ADD COLUMN IF NOT EXISTS level INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS coins INT DEFAULT 0;
    `);
    console.log('✓ Columnas XP/level/coins verificadas');

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

    // Crear tabla quests
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quests (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        world INTEGER NOT NULL,
        "order" INTEGER NOT NULL,
        difficulty INTEGER DEFAULT 1,
        npc VARCHAR(255),
        story TEXT,
        hints JSONB DEFAULT '[]',
        required_commands JSONB DEFAULT '[]',
        objectives JSONB DEFAULT '[]',
        prerequisites JSONB DEFAULT '[]',
        rewards JSONB DEFAULT '{"xp":0,"coins":0}',
        time_limit INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(world, "order")
      );
    `);
    console.log('✓ Tabla quests creada');

    // Crear tabla user_quest_progress
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_quest_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quest_id INTEGER NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'locked',
        attempts INTEGER DEFAULT 0,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, quest_id)
      );
    `);
    console.log('✓ Tabla user_quest_progress creada');

    // Crear tabla user_progress (original para lessons)
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
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_quest_progress_user_id ON user_quest_progress(user_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_quest_progress_quest_id ON user_quest_progress(quest_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_quests_world ON quests(world);`);
    console.log('✓ Índices creados');

    console.log('\n✅ Base de datos inicializada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando BD:', error.message);
    process.exit(1);
  }
};

initializeDatabase();
