import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function testConnection() {
  try {
    console.log('🔄 Probando conexión a Neon...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa!');
    console.log('Timestamp del servidor:', result.rows[0]);

    // Probar si existen las tablas
    const tablesResult = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );

    console.log('\n📊 Tablas en la base de datos:');
    if (tablesResult.rows.length === 0) {
      console.log('⚠️  No hay tablas. Necesitas ejecutar: npm run init-db');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }

    await pool.end();
  } catch (error) {
    console.error('❌ Error en conexión:', error.message);
    process.exit(1);
  }
}

testConnection();
