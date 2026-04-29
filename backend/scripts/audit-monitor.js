#!/usr/bin/env node

/**
 * Script de monitoreo de auditoría
 * Analiza los logs de seguridad y detecta patrones sospechosos
 *
 * Uso: node scripts/audit-monitor.js [opciones]
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const AUDIT_DIR = join(tmpdir(), 'linuxquest-audit');

class AuditMonitor {
  constructor() {
    this.commands = [];
    this.threats = [];
    this.violations = [];
    this.sessions = [];
  }

  loadLogs() {
    console.log('📖 Cargando logs de auditoría...\n');

    if (!existsSync(AUDIT_DIR)) {
      console.error(`❌ Directorio de auditoría no encontrado: ${AUDIT_DIR}`);
      return false;
    }

    try {
      // Cargar logs
      if (existsSync(join(AUDIT_DIR, 'commands.log'))) {
        const content = readFileSync(join(AUDIT_DIR, 'commands.log'), 'utf8');
        this.commands = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }

      if (existsSync(join(AUDIT_DIR, 'security-threats.log'))) {
        const content = readFileSync(join(AUDIT_DIR, 'security-threats.log'), 'utf8');
        this.threats = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }

      if (existsSync(join(AUDIT_DIR, 'security-violations.log'))) {
        const content = readFileSync(join(AUDIT_DIR, 'security-violations.log'), 'utf8');
        this.violations = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }

      if (existsSync(join(AUDIT_DIR, 'sessions.log'))) {
        const content = readFileSync(join(AUDIT_DIR, 'sessions.log'), 'utf8');
        this.sessions = content
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }

      return true;
    } catch (error) {
      console.error('❌ Error cargando logs:', error.message);
      return false;
    }
  }

  printSummary() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📊 RESUMEN DE AUDITORÍA');
    console.log('═══════════════════════════════════════════════════\n');

    console.log(`📝 Total de comandos: ${this.commands.length}`);
    console.log(`🚨 Total de amenazas bloqueadas: ${this.threats.length}`);
    console.log(`⚠️  Total de violaciones: ${this.violations.length}`);
    console.log(`👥 Total de sesiones: ${this.sessions.length}`);

    if (this.threats.length > 0) {
      console.log('\n🚨 AMENAZAS DETECTADAS (últimas 5):');
      console.log('─────────────────────────────────');
      this.threats.slice(-5).forEach((threat, idx) => {
        console.log(`\n${idx + 1}. Usuario: ${threat.userId}`);
        console.log(`   Misión: ${threat.questId || 'N/A'}`);
        console.log(`   Comando: ${threat.command}`);
        console.log(`   Razón: ${threat.reason || 'N/A'}`);
        console.log(`   Hora: ${new Date(threat.timestamp).toLocaleString()}`);
      });
    } else {
      console.log('\n✅ No hay amenazas registradas');
    }

    if (this.violations.length > 0) {
      console.log('\n⚠️  VIOLACIONES (últimas 5):');
      console.log('─────────────────────────────────');
      this.violations.slice(-5).forEach((violation, idx) => {
        console.log(`\n${idx + 1}. Usuario: ${violation.userId}`);
        console.log(`   Tipo: ${violation.type}`);
        console.log(`   Detalles: ${JSON.stringify(violation.details).substring(0, 100)}`);
        console.log(`   Hora: ${new Date(violation.timestamp).toLocaleString()}`);
      });
    } else {
      console.log('\n✅ No hay violaciones registradas');
    }
  }

  printUserStats() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('👥 ESTADÍSTICAS POR USUARIO');
    console.log('═══════════════════════════════════════════════════\n');

    const userStats = new Map();

    // Analizar comandos por usuario
    this.commands.forEach(cmd => {
      if (!userStats.has(cmd.userId)) {
        userStats.set(cmd.userId, {
          userId: cmd.userId,
          commands: 0,
          threats: 0,
          violations: 0,
          successfulCommands: 0,
          failedCommands: 0
        });
      }

      const stats = userStats.get(cmd.userId);
      stats.commands++;

      if (!cmd.error) {
        stats.successfulCommands++;
      } else {
        stats.failedCommands++;
      }
    });

    // Contar amenazas por usuario
    this.threats.forEach(threat => {
      if (userStats.has(threat.userId)) {
        userStats.get(threat.userId).threats++;
      }
    });

    // Contar violaciones por usuario
    this.violations.forEach(violation => {
      if (userStats.has(violation.userId)) {
        userStats.get(violation.userId).violations++;
      }
    });

    // Mostrar estadísticas
    if (userStats.size === 0) {
      console.log('No hay datos de usuario');
      return;
    }

    Array.from(userStats.values())
      .sort((a, b) => b.commands - a.commands)
      .forEach(stats => {
        console.log(`\nUsuario: ${stats.userId}`);
        console.log(`  📝 Comandos ejecutados: ${stats.commands}`);
        console.log(`     ✅ Exitosos: ${stats.successfulCommands}`);
        console.log(`     ❌ Fallidos: ${stats.failedCommands}`);
        console.log(`  🚨 Amenazas bloqueadas: ${stats.threats}`);
        console.log(`  ⚠️  Violaciones: ${stats.violations}`);

        if (stats.threats > 0 || stats.violations > 0) {
          console.log(`  ⚠️  USUARIO CON ACTIVIDAD SOSPECHOSA`);
        }
      });
  }

  printCommandStats() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📝 ESTADÍSTICAS DE COMANDOS');
    console.log('═══════════════════════════════════════════════════\n');

    const commandStats = new Map();

    this.commands.forEach(cmd => {
      const baseCmd = cmd.command.split(/\s+/)[0];

      if (!commandStats.has(baseCmd)) {
        commandStats.set(baseCmd, {
          command: baseCmd,
          count: 0,
          successful: 0,
          failed: 0
        });
      }

      const stats = commandStats.get(baseCmd);
      stats.count++;

      if (!cmd.error) {
        stats.successful++;
      } else {
        stats.failed++;
      }
    });

    // Mostrar top 10 comandos
    const topCommands = Array.from(commandStats.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    console.log('Top 10 comandos ejecutados:\n');
    topCommands.forEach((stats, idx) => {
      const successRate = stats.count > 0
        ? ((stats.successful / stats.count) * 100).toFixed(1)
        : '0';
      console.log(`${idx + 1}. ${stats.command.padEnd(15)} - ${stats.count} veces (${successRate}% éxito)`);
    });
  }

  printSessionStats() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('👤 SESIONES');
    console.log('═══════════════════════════════════════════════════\n');

    const sessionsByUser = new Map();

    this.sessions.forEach(session => {
      const userId = session.userId;

      if (!sessionsByUser.has(userId)) {
        sessionsByUser.set(userId, {
          userId,
          startTimes: [],
          endTimes: [],
          totalDuration: 0,
          sessionCount: 0
        });
      }

      const userSessions = sessionsByUser.get(userId);

      if (session.event === 'SESSION_START') {
        userSessions.startTimes.push(new Date(session.timestamp));
        userSessions.sessionCount++;
      } else if (session.event === 'SESSION_END') {
        userSessions.endTimes.push(new Date(session.timestamp));
        if (session.durationMs) {
          userSessions.totalDuration += session.durationMs;
        }
      }
    });

    console.log('Sesiones activas:\n');
    Array.from(sessionsByUser.values()).forEach(sess => {
      const avgDuration = sess.sessionCount > 0
        ? (sess.totalDuration / sess.sessionCount / 1000).toFixed(1)
        : '0';
      console.log(`${sess.userId}`);
      console.log(`  Sesiones: ${sess.sessionCount}`);
      console.log(`  Duración promedio: ${avgDuration}s`);
      console.log(`  Duración total: ${(sess.totalDuration / 1000 / 60).toFixed(1)} minutos\n`);
    });
  }

  printThreatAnalysis() {
    if (this.threats.length === 0) {
      return;
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log('🚨 ANÁLISIS DE AMENAZAS');
    console.log('═══════════════════════════════════════════════════\n');

    const threatTypes = new Map();

    this.threats.forEach(threat => {
      const type = threat.reason || 'Unknown';

      if (!threatTypes.has(type)) {
        threatTypes.set(type, 0);
      }

      threatTypes.set(type, threatTypes.get(type) + 1);
    });

    console.log('Tipos de amenazas detectadas:\n');
    Array.from(threatTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`${type.padEnd(40)} - ${count} intentos`);
      });
  }

  run(command = 'all') {
    if (!this.loadLogs()) {
      process.exit(1);
    }

    switch (command) {
      case 'summary':
        this.printSummary();
        break;
      case 'users':
        this.printUserStats();
        break;
      case 'commands':
        this.printCommandStats();
        break;
      case 'sessions':
        this.printSessionStats();
        break;
      case 'threats':
        this.printThreatAnalysis();
        break;
      case 'all':
      default:
        this.printSummary();
        this.printUserStats();
        this.printCommandStats();
        this.printSessionStats();
        this.printThreatAnalysis();
        break;
    }

    console.log('\n═══════════════════════════════════════════════════\n');
  }
}

// Ejecutar monitor
const monitor = new AuditMonitor();
const command = process.argv[2] || 'all';

console.log('\n🔒 LinuxQuest - Monitor de Auditoría de Seguridad');
console.log('═══════════════════════════════════════════════════\n');

monitor.run(command);
