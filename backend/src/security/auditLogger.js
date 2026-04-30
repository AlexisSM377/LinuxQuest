import { appendFileSync, mkdirSync, statSync, renameSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

/**
 * Sistema de auditoría para registrar todas las acciones de usuarios
 * Detecta patrones maliciosos y registra intentos de seguridad
 */

const AUDIT_DIR = join(tmpdir(), 'linuxquest-audit');
const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5MB por archivo de log
const MAX_ROTATED_FILES = 3; // mantener max 3 archivos rotados por tipo
const THREAT_LEVEL = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};

class AuditLogger {
  constructor() {
    try {
      mkdirSync(AUDIT_DIR, { recursive: true });
    } catch (error) {
      console.error('Error creating audit directory:', error);
    }
  }

  /**
   * Registra intento de comando
   */
  logCommandAttempt(userId, questId, command, result, metadata = {}) {
    const timestamp = new Date().toISOString();
    const threatLevel = this.analyzeThreat(command, result);

    const logEntry = {
      timestamp,
      userId,
      questId,
      command,
      success: result.error ? false : true,
      error: result.error || null,
      threatLevel,
      ...metadata
    };

    this.writeLog('commands', logEntry);

    // Si es crítico, registra separadamente
    if (threatLevel === THREAT_LEVEL.CRITICAL) {
      this.writeLog('security-threats', logEntry);
    }

    return logEntry;
  }

  /**
   * Registra errores de seguridad
   */
  logSecurityViolation(userId, questId, violationType, details) {
    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      userId,
      questId,
      type: violationType,
      details,
      threatLevel: THREAT_LEVEL.CRITICAL
    };

    this.writeLog('security-violations', logEntry);
    console.warn(`🚨 Security Violation: ${violationType}`, details);

    return logEntry;
  }

  /**
   * Registra acceso a sandbox
   */
  logSandboxAccess(userId, action, status) {
    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      userId,
      action,
      status
    };

    this.writeLog('sandbox-access', logEntry);
  }

  /**
   * Analiza nivel de amenaza de un comando
   */
  analyzeThreat(command, result) {
    // Si ejecutó con éxito un comando peligroso, es crítico
    if (!result.error && this.isSuspiciousCommand(command)) {
      return THREAT_LEVEL.CRITICAL;
    }

    // Si intentó algo peligroso pero fue bloqueado
    if (result.error && this.isSuspiciousCommand(command)) {
      return THREAT_LEVEL.WARNING;
    }

    return THREAT_LEVEL.INFO;
  }

  /**
   * Detecta comandos sospechosos
   */
  isSuspiciousCommand(command) {
    const suspiciousPatterns = [
      /rm\s+(-r|-f|--recursive|--force).*\/|rm\s+\*/i,
      /chmod\s+777/,
      /sudo.*root/i,
      /cat.*\/etc\/shadow/,
      /docker/i,
      /mount/i,
      /modprobe|insmod/i,
      /\|\s*(nc|ncat|telnet)/i,
      />\s*\/dev\/(sda|sdb)/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(command)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Rota el log si excede el tamaño máximo y limpia archivos viejos
   */
  rotateLogIfNeeded(logFile) {
    try {
      const stat = statSync(logFile);
      if (stat.size > MAX_LOG_SIZE) {
        const rotated = logFile.replace('.log', `.${Date.now()}.log`);
        renameSync(logFile, rotated);
        this.cleanupOldRotatedFiles(logFile);
      }
    } catch {
      // archivo no existe aún, ok
    }
  }

  /**
   * Elimina archivos rotados antiguos, manteniendo solo MAX_ROTATED_FILES
   */
  cleanupOldRotatedFiles(baseLogFile) {
    try {
      const baseName = baseLogFile.split('/').pop().replace('.log', '');
      const files = readdirSync(AUDIT_DIR)
        .filter(f => f.startsWith(baseName + '.') && f.endsWith('.log'))
        .sort()
        .reverse();
      for (const file of files.slice(MAX_ROTATED_FILES)) {
        unlinkSync(join(AUDIT_DIR, file));
      }
    } catch {
      // ignore cleanup errors
    }
  }

  /**
   * Escribe entrada de log
   */
  writeLog(logType, entry) {
    try {
      const logFile = join(AUDIT_DIR, `${logType}.log`);
      this.rotateLogIfNeeded(logFile);
      const logLine = JSON.stringify(entry) + '\n';
      appendFileSync(logFile, logLine, 'utf8');
    } catch (error) {
      console.error(`Error writing to audit log ${logType}:`, error);
    }
  }

  /**
   * Obtiene estadísticas de un usuario
   */
  getUserStats(userId) {
    return {
      userId,
      timestamp: new Date().toISOString(),
      auditDir: AUDIT_DIR
    };
  }

  /**
   * Registra sesión de usuario
   */
  logSessionStart(userId) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      userId,
      event: 'SESSION_START'
    };
    this.writeLog('sessions', logEntry);
  }

  /**
   * Registra fin de sesión
   */
  logSessionEnd(userId, duration) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      userId,
      event: 'SESSION_END',
      durationMs: duration
    };
    this.writeLog('sessions', logEntry);
  }
}

export default new AuditLogger();
