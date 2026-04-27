#!/usr/bin/env node

/**
 * Script de verificación pre-deployment
 * Verifica que todos los componentes están correctamente configurados
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import pool from '../src/db.js';

const checks = [];

function check(name, fn) {
  checks.push({ name, fn });
}

function log(level, message) {
  const symbols = {
    error: '❌',
    success: '✅',
    warning: '⚠️ ',
    info: 'ℹ️ '
  };
  console.log(`${symbols[level]} ${message}`);
}

// ============= VERIFICACIONES =============

check('Conexión a base de datos', async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    return { success: true, message: 'Base de datos conectada' };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Tabla de usuarios', async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users'
      )
    `);
    if (result.rows[0].exists) {
      return { success: true, message: 'Tabla usuarios existe' };
    } else {
      return { success: false, message: 'Tabla usuarios no encontrada' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Tabla de quests', async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'quests'
      )
    `);
    if (result.rows[0].exists) {
      return { success: true, message: 'Tabla quests existe' };
    } else {
      return { success: false, message: 'Tabla quests no encontrada' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Tabla de progreso', async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'user_quest_progress'
      )
    `);
    if (result.rows[0].exists) {
      return { success: true, message: 'Tabla progreso existe' };
    } else {
      return { success: false, message: 'Tabla progreso no encontrada' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Misiones en base de datos', async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM quests');
    const count = result.rows[0].count;
    if (count > 0) {
      return { success: true, message: `${count} misiones encontradas` };
    } else {
      return { success: false, message: 'No hay misiones. Ejecuta: npm run seed-quests' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Archivo: sandboxValidator.js', () => {
  const path = join(process.cwd(), 'src/security/sandboxValidator.js');
  if (existsSync(path)) {
    return { success: true, message: 'Archivo existe' };
  } else {
    return { success: false, message: `No encontrado: ${path}` };
  }
});

check('Archivo: auditLogger.js', () => {
  const path = join(process.cwd(), 'src/security/auditLogger.js');
  if (existsSync(path)) {
    return { success: true, message: 'Archivo existe' };
  } else {
    return { success: false, message: `No encontrado: ${path}` };
  }
});

check('Archivo: securityConfig.js', () => {
  const path = join(process.cwd(), 'src/security/securityConfig.js');
  if (existsSync(path)) {
    return { success: true, message: 'Archivo existe' };
  } else {
    return { success: false, message: `No encontrado: ${path}` };
  }
});

check('Archivo: questCommands.js', () => {
  const path = join(process.cwd(), 'src/config/questCommands.js');
  if (existsSync(path)) {
    // Verificar que tiene 95 configuraciones
    try {
      const content = readFileSync(path, 'utf8');
      const matches = content.match(/^\s*\d+:\s*\{/gm);
      const count = matches ? matches.length : 0;
      if (count === 95) {
        return { success: true, message: `${count} configuraciones de misiones` };
      } else {
        return { success: false, message: `Solo ${count}/95 configuraciones (falta: ${95 - count})` };
      }
    } catch (error) {
      return { success: false, message: `Error leyendo archivo: ${error.message}` };
    }
  } else {
    return { success: false, message: `No encontrado: ${path}` };
  }
});

check('Archivo: seed-quests.js', () => {
  const path = join(process.cwd(), 'scripts/seed-quests.js');
  if (existsSync(path)) {
    return { success: true, message: 'Archivo existe' };
  } else {
    return { success: false, message: `No encontrado: ${path}` };
  }
});

check('Importación de SandboxValidator', () => {
  try {
    const path = join(process.cwd(), 'src/security/sandboxValidator.js');
    const content = readFileSync(path, 'utf8');
    if (content.includes('class SandboxValidator') && content.includes('export default')) {
      return { success: true, message: 'Clase correctamente definida' };
    } else {
      return { success: false, message: 'Clase no correctamente definida' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Importación de commandService', () => {
  try {
    const path = join(process.cwd(), 'src/services/commandService.js');
    const content = readFileSync(path, 'utf8');
    if (content.includes('import SandboxValidator') &&
        content.includes('import auditLogger') &&
        content.includes('import SECURITY_CONFIG')) {
      return { success: true, message: 'Imports de seguridad correctos' };
    } else {
      return { success: false, message: 'Imports de seguridad incompletos' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Integración en server.js', () => {
  try {
    const path = join(process.cwd(), 'src/server.js');
    const content = readFileSync(path, 'utf8');
    if (content.includes('import auditLogger') &&
        content.includes('executeCommand(command, userSandboxDir, questId, socket.userId)')) {
      return { success: true, message: 'Integración completa' };
    } else {
      return { success: false, message: 'Integración incompleta' };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
});

check('Documentación de seguridad', () => {
  const files = [
    'docs/SECURITY.md',
    'docs/SECURITY-QUICKSTART.md',
    'backend/src/security/README.md'
  ];

  const missing = files.filter(f => !existsSync(join(process.cwd(), '..', '..', f)));

  if (missing.length === 0) {
    return { success: true, message: 'Toda documentación presente' };
  } else {
    return { success: false, message: `Faltan: ${missing.join(', ')}` };
  }
});

// ============= EJECUTAR VERIFICACIONES =============

async function runChecks() {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║  🔍 VERIFICACIÓN PRE-DEPLOYMENT - LinuxQuest      ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  for (const check of checks) {
    try {
      process.stdout.write(`Verificando: ${check.name}... `);
      const result = await Promise.resolve(check.fn());

      if (result.success) {
        log('success', result.message);
        passed++;
      } else {
        log('error', result.message);
        failed++;
      }
    } catch (error) {
      log('error', `Excepción: ${error.message}`);
      failed++;
    }
  }

  // ============= RESUMEN =============
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log(`║  📊 RESULTADO: ${passed}/${checks.length} verificaciones pasadas        ║`);
  console.log('╚════════════════════════════════════════════════════╝\n');

  if (failed === 0) {
    console.log('✅ ¡Sistema listo para deployment!\n');
    console.log('Próximos pasos:');
    console.log('  1. npm run seed-quests      (Poblar base de datos)');
    console.log('  2. npm run dev              (Iniciar servidor)');
    console.log('  3. Testing end-to-end\n');
    process.exit(0);
  } else {
    console.log(`❌ ${failed} verificaciones fallaron\n`);
    console.log('Por favor, arregla los errores arriba antes de continuar.\n');
    process.exit(1);
  }
}

runChecks().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});
