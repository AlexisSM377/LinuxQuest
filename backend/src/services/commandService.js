import { exec } from 'child_process';
import { promisify } from 'util';
import { getQuestCommandConfig } from '../config/questCommands.js';
import SandboxValidator from '../security/sandboxValidator.js';
import auditLogger from '../security/auditLogger.js';
import SECURITY_CONFIG, {
  isGloballyAllowedCommand,
  getAllowedCommandsForMission,
  getTimeoutForMission
} from '../security/securityConfig.js';

const execAsync = promisify(exec);

const GLOBAL_ALLOWED_COMMANDS = {
  help: 'Muestra comandos disponibles',
  ls: 'Lista archivos',
  pwd: 'Directorio actual',
  echo: 'Imprime texto',
  cat: 'Muestra contenido de archivo',
  whoami: 'Usuario actual',
  date: 'Fecha y hora',
  mkdir: 'Crea un directorio',
  touch: 'Crea un archivo vacío',
  rm: 'Elimina archivo o directorio',
  find: 'Busca archivos',
  grep: 'Busca texto en archivos',
  wc: 'Cuenta líneas, palabras, caracteres',
  head: 'Muestra primeras líneas',
  tail: 'Muestra últimas líneas',
  sort: 'Ordena líneas',
  uname: 'Información del sistema',
  cd: 'Cambia de directorio',
  cp: 'Copia archivo',
  mv: 'Mueve o renombra',
  chmod: 'Cambia permisos',
  chown: 'Cambia propietario',
  ps: 'Procesos en ejecución',
  kill: 'Termina un proceso',
  man: 'Manual de comandos'
};

const sanitizeOutput = (output, maxLines = 500) => {
  if (!output) return '';
  return output
    .split('\n')
    .slice(0, maxLines)
    .join('\n');
};

/**
 * Ejecuta un comando en el sandbox del usuario con múltiples capas de seguridad
 * @param {string} command - Comando a ejecutar
 * @param {string} userSandboxDir - Directorio sandbox del usuario
 * @param {number} questId - ID de la misión (opcional)
 * @param {string} userId - ID del usuario (para auditoría)
 * @returns {Promise<{output: string, error: string}>}
 */
export const executeCommand = async (command, userSandboxDir, questId = null, userId = null) => {
  const startTime = Date.now();

  try {
    const trimmedCmd = command.trim();

    // Validación básica
    if (!trimmedCmd) {
      return { error: 'Comando vacío', output: '' };
    }

    const cmdName = trimmedCmd.split(/\s+/)[0];

    // ========== CAPA 1: Auditoría Inicial ==========
    if (userId) {
      auditLogger.logCommandAttempt(userId, questId, trimmedCmd, { status: 'ATTEMPT' });
    }

    // ========== CAPA 2: Validación Global ==========
    // Verificar que comando está globalmente permitido
    if (!GLOBAL_ALLOWED_COMMANDS[cmdName]) {
      const error = `Comando no permitido: ${cmdName}. Usa 'help' para ver disponibles.`;
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'FORBIDDEN_COMMAND', {
          command: cmdName,
          reason: 'Command not in global allowlist'
        });
      }
      return { error, output: '' };
    }

    // ========== CAPA 3: Validación Global de Patrones Peligrosos ==========
    for (const pattern of SECURITY_CONFIG.GLOBAL_DANGEROUS_PATTERNS) {
      if (pattern.test(trimmedCmd)) {
        const error = 'Comando bloqueado: contiene operaciones peligrosas.';
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_PATTERN_DETECTED', {
            command: trimmedCmd,
            pattern: pattern.toString()
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 4: Sandbox Validator ==========
    const validator = new SandboxValidator(userSandboxDir);
    const fullValidation = validator.fullValidate(trimmedCmd, {});

    if (!fullValidation.valid) {
      const error = fullValidation.errors[0] || 'Comando validación fallida';
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'VALIDATION_FAILED', {
          command: trimmedCmd,
          errors: fullValidation.errors
        });
      }
      return { error, output: '' };
    }

    // Advertencias (pero permitir ejecución)
    if (fullValidation.warnings.length > 0) {
      console.warn(`[WARN] ${fullValidation.warnings.join(', ')}`);
    }

    // ========== CAPA 5: Configuración por Misión ==========
    let questConfig = null;
    let allowedCommands = getAllowedCommandsForMission(questId);
    let timeoutMs = getTimeoutForMission(questId) || SECURITY_CONFIG.COMMAND_LIMITS.MAX_EXECUTION_TIME;

    if (questId) {
      questConfig = getQuestCommandConfig(questId);
      if (questConfig) {
        allowedCommands = questConfig.allowedCommands || allowedCommands;
        timeoutMs = questConfig.timeout || timeoutMs;

        // Validar que comando está permitido en esta misión
        if (!allowedCommands.includes(cmdName)) {
          const error = `Para esta misión solo puedes usar: ${allowedCommands.join(', ')}`;
          if (userId) {
            auditLogger.logSecurityViolation(userId, questId, 'COMMAND_NOT_ALLOWED_FOR_QUEST', {
              command: cmdName,
              allowedCommands
            });
          }
          return { error, output: '' };
        }

        // Validar contra patrones específicos de la misión
        if (questConfig.dangerousPatterns && questConfig.dangerousPatterns.length > 0) {
          for (const pattern of questConfig.dangerousPatterns) {
            if (pattern.test(trimmedCmd)) {
              const error = questConfig.warningMessage || 'Comando bloqueado para esta misión.';
              if (userId) {
                auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_PATTERN_IN_QUEST', {
                  command: trimmedCmd,
                  pattern: pattern.toString()
                });
              }
              return { error, output: '' };
            }
          }
        }
      }
    }

    // ========== COMANDO ESPECIAL: HELP ==========
    if (cmdName === 'help') {
      const helpText = allowedCommands
        .map(cmd => `  ${cmd.padEnd(10)} - ${GLOBAL_ALLOWED_COMMANDS[cmd] || 'Sin descripción'}`)
        .join('\n');
      const output = `Comandos disponibles para esta misión:\n${helpText}`;
      if (userId) {
        auditLogger.logCommandAttempt(userId, questId, trimmedCmd, {
          error: null,
          output: output.substring(0, 100)
        });
      }
      return { output, error: '' };
    }

    // ========== CAPA 6: EJECUCIÓN EN SANDBOX ==========
    let stdout = '';
    let stderr = '';
    let executionTime = 0;

    try {
      const execStartTime = Date.now();
      const result = await execAsync(trimmedCmd, {
        cwd: userSandboxDir,
        timeout: timeoutMs,
        maxBuffer: SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_SIZE,
        shell: '/bin/bash'
      });
      executionTime = Date.now() - execStartTime;
      stdout = result.stdout || '';
      stderr = result.stderr || '';
    } catch (execError) {
      executionTime = Date.now() - startTime;

      if (execError.code === 'ERR_CHILD_PROCESS_TIMEOUT') {
        const error = `Comando excedió tiempo límite: ${timeoutMs}ms`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'TIMEOUT_EXCEEDED', {
            command: trimmedCmd,
            timeout: timeoutMs,
            actual: executionTime
          });
        }
        return { error, output: '' };
      }

      if (execError.code === 'ENOENT') {
        return { error: 'Comando no encontrado', output: '' };
      }

      // Para stderr normal (no es error crítico)
      stderr = execError.stderr || execError.message || 'Error ejecutando comando';
    }

    // ========== CAPA 7: Validar Límites de Output ==========
    const outputLines = stdout.split('\n').length;
    const outputSize = Buffer.byteLength(stdout, 'utf8');

    const resourceCheck = validator.validateResourceLimits(
      executionTime,
      outputSize,
      outputLines
    );

    if (!resourceCheck.valid) {
      const error = resourceCheck.errors[0] || 'Output excedió límites';
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'RESOURCE_LIMIT_EXCEEDED', {
          command: trimmedCmd,
          errors: resourceCheck.errors
        });
      }
      return { error, output: '' };
    }

    // ========== CAPA 8: Sanitizar Output ==========
    const sanitized = sanitizeOutput(stdout || '(sin salida)', SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_LINES);

    // ========== AUDITORÍA FINAL ==========
    if (userId) {
      auditLogger.logCommandAttempt(userId, questId, trimmedCmd, {
        error: stderr || null,
        output: sanitized.substring(0, 200),
        executionTime,
        outputSize,
        outputLines
      });
    }

    // ========== RESPUESTA ==========
    if (stderr && cmdName !== 'grep') {
      return { error: stderr, output: '' };
    }

    return { output: sanitized, error: '' };

  } catch (error) {
    const executionTime = Date.now() - startTime;

    if (userId) {
      auditLogger.logSecurityViolation(userId, questId, 'EXECUTION_ERROR', {
        command,
        error: error.message,
        executionTime
      });
    }

    console.error('Command execution error:', error);
    return { error: error.message || 'Error ejecutando comando', output: '' };
  }
};
