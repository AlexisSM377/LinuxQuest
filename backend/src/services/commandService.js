import { exec } from 'child_process';
import { promisify } from 'util';
import { getQuestCommandConfig } from '../config/questCommands.js';
import SandboxValidator from '../security/sandboxValidator.js';
import auditLogger from '../security/auditLogger.js';
import SECURITY_CONFIG, {
  isGloballyAllowedCommand,
  validateCommandArgs,
  getAllowedCommandsForMission,
  getTimeoutForMission
} from '../security/securityConfig.js';

const execAsync = promisify(exec);

const GLOBAL_ALLOWED_COMMANDS = {
  // Builtins / básicos
  help: 'Muestra comandos disponibles',
  cd: 'Cambia de directorio',
  pwd: 'Directorio actual',
  echo: 'Imprime texto',
  date: 'Fecha y hora',

  // Archivos y directorios
  ls: 'Lista archivos',
  cat: 'Muestra contenido de archivo',
  mkdir: 'Crea un directorio',
  touch: 'Crea un archivo vacío',
  rm: 'Elimina archivo o directorio',
  cp: 'Copia archivo',
  mv: 'Mueve o renombra',
  ln: 'Crea enlaces',
  chmod: 'Cambia permisos',
  chown: 'Cambia propietario',
  getfacl: 'Lee ACLs',
  setfacl: 'Modifica ACLs',

  // Búsqueda y procesamiento de texto
  find: 'Busca archivos',
  grep: 'Busca texto en archivos',
  sed: 'Editor de flujo de texto',
  awk: 'Procesador de patrones',
  cut: 'Extrae columnas',
  sort: 'Ordena líneas',
  uniq: 'Filtra duplicados',
  wc: 'Cuenta líneas, palabras, caracteres',
  head: 'Muestra primeras líneas',
  tail: 'Muestra últimas líneas',
  tee: 'Lee de stdin y escribe a stdout/archivo',
  less: 'Visor de archivos paginado',

  // Compresión / archivado
  gzip: 'Compresión gzip',
  tar: 'Archivado tar',

  // Información del sistema
  uname: 'Información del sistema',
  whoami: 'Usuario actual',
  id: 'IDs de usuario y grupo',
  who: 'Usuarios conectados',
  w: 'Quién está y qué hace',
  uptime: 'Tiempo de arranque del sistema',
  df: 'Uso de disco por sistema de archivos',
  du: 'Uso de espacio por archivo/directorio',
  free: 'Uso de memoria',
  lsblk: 'Lista dispositivos de bloque',
  lscpu: 'Información de CPU',
  lsusb: 'Lista dispositivos USB',
  dmesg: 'Mensajes del kernel',

  // Procesos
  ps: 'Procesos en ejecución',
  top: 'Monitor de procesos',
  kill: 'Termina un proceso',

  // Red
  ip: 'Configuración de red',
  ss: 'Estado de sockets',
  netstat: 'Estado de la red',
  route: 'Tabla de rutas',
  ping: 'Prueba de conectividad',
  curl: 'Cliente HTTP',
  dig: 'Consulta DNS',
  host: 'Consulta DNS',
  nslookup: 'Consulta DNS',
  iptables: 'Firewall',

  // Usuarios y permisos
  useradd: 'Crea un usuario',
  usermod: 'Modifica un usuario',
  groupadd: 'Crea un grupo',
  passwd: 'Cambia contraseña',
  su: 'Cambia de usuario',
  sudo: 'Ejecuta como otro usuario',
  visudo: 'Edita configuración de sudo',

  // SSH
  ssh: 'Cliente SSH',
  'ssh-keygen': 'Genera claves SSH',

  // Búsqueda y detección
  which: 'Ubica comandos en PATH',
  seq: 'Genera secuencia de números',

  // Documentación
  man: 'Manual de comandos',
  apropos: 'Busca en el manual',

  // Criptografía
  gpg: 'Cifrado y firmas GPG',

  // Auditoría y seguridad
  auditctl: 'Control del subsistema de auditoría',
  ausearch: 'Búsqueda en logs de auditoría',
  journalctl: 'Logs del sistema (systemd)',
  semanage: 'Gestión de SELinux',

  // Comandos LPI adicionales
  chgrp: 'Cambia grupo propietario',
  userdel: 'Elimina un usuario',
  chage: 'Cambia aging de contraseña',
  locate: 'Busca archivos en base de datos',
  updatedb: 'Actualiza base de datos de locate',
  mtr: 'Diagnóstico de red (traceroute mejorado)',
  lsof: 'Lista archivos abiertos',
  groups: 'Muestra grupos de un usuario',
  gpasswd: 'Administra grupos',
  newgrp: 'Cambia grupo efectivo',
  last: 'Historial de logins',
  lastlog: 'Último login por usuario',
  cal: 'Calendario',
  file: 'Tipo de archivo',
  stat: 'Stats de archivo',
  tac: 'Cat inverso',
  rev: 'Invierte líneas',
  nl: 'Numera líneas',
  od: 'Dump octal',
  strings: 'Imprime strings imprimibles',
  base64: 'Codifica/decodifica base64',
  md5sum: 'Hash MD5',
  sha256sum: 'Hash SHA256',
  vi: 'Editor de texto vi (mock)',
  vim: 'Editor de texto vim (mock)',
  nano: 'Editor de texto nano (mock)',
  htop: 'Monitor de procesos mejorado (mock)',
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

    // CAPA 0: Limitar longitud antes de cualquier procesamiento
    if (trimmedCmd.length > SECURITY_CONFIG.COMMAND_LIMITS.MAX_COMMAND_LENGTH) {
      return { error: 'Comando excede longitud máxima permitida', output: '' };
    }

    // Bloquear caracteres de control / null bytes
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(trimmedCmd)) {
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'CONTROL_CHARS_DETECTED', {
          command: trimmedCmd.replace(/[\x00-\x1F]/g, '?')
        });
      }
      return { error: 'Comando contiene caracteres no permitidos', output: '' };
    }

    // Extraer TODOS los comandos de un pipe (ls | grep | wc → ['ls', 'grep', 'wc'])
    const pipeSegments = trimmedCmd.split(/\s*\|\s*/);
    const allCmdNames = pipeSegments.map(seg => seg.trim().split(/\s+/)[0]).filter(Boolean);
    const cmdName = allCmdNames[0];

    // ========== CAPA 1: Auditoría Inicial ==========
    if (userId) {
      auditLogger.logCommandAttempt(userId, questId, trimmedCmd, { status: 'ATTEMPT' });
    }

    // ========== CAPA 2A: Blacklist Global Hardcoded ==========
    for (const cmd of allCmdNames) {
      if (!isGloballyAllowedCommand(cmd)) {
        const error = `Comando bloqueado por seguridad: ${cmd}`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'HARDCODED_FORBIDDEN_COMMAND', {
            command: cmd,
            reason: 'Command in FORBIDDEN_COMMANDS blacklist'
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 2B: Allowlist Global ==========
    for (const cmd of allCmdNames) {
      if (!GLOBAL_ALLOWED_COMMANDS[cmd]) {
        const error = `Comando no permitido: ${cmd}. Usa 'help' para ver disponibles.`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'FORBIDDEN_COMMAND', {
            command: cmd,
            reason: 'Command not in global allowlist'
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 2C: Validar argumentos peligrosos ==========
    const argsValidation = validateCommandArgs(trimmedCmd);
    if (!argsValidation.safe) {
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_ARGUMENTS', {
          command: trimmedCmd,
          reason: argsValidation.reason
        });
      }
      return { error: argsValidation.reason, output: '' };
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

        // Validar que TODOS los comandos del pipe estén permitidos en esta misión
        for (const cmd of allCmdNames) {
          if (!allowedCommands.includes(cmd)) {
            const error = `Para esta misión solo puedes usar: ${allowedCommands.join(', ')}`;
            if (userId) {
              auditLogger.logSecurityViolation(userId, questId, 'COMMAND_NOT_ALLOWED_FOR_QUEST', {
                command: cmd,
                allowedCommands
              });
            }
            return { error, output: '' };
          }
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
      // Entorno limpio: sin variables heredadas que puedan filtrar info del backend
      const cleanEnv = {
        PATH: '/usr/local/bin:/usr/bin:/bin',
        HOME: userSandboxDir,
        USER: 'sandbox',
        SHELL: '/bin/bash',
        TERM: 'xterm-256color',
        LANG: 'C.UTF-8',
        LC_ALL: 'C.UTF-8',
        PWD: userSandboxDir
      };

      const result = await execAsync(trimmedCmd, {
        cwd: userSandboxDir,
        timeout: timeoutMs,
        maxBuffer: SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_SIZE,
        shell: '/bin/bash',
        env: cleanEnv,
        killSignal: 'SIGKILL',
        windowsHide: true
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

      // grep exit code 1 = no matches (no es un error real)
      if (allCmdNames.includes('grep') && execError.code === 1) {
        stdout = execError.stdout || '';
        stderr = '';
      } else {
        // Para stderr normal (no es error crítico)
        stderr = execError.stderr || execError.message || 'Error ejecutando comando';
      }
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
    if (stderr) {
      return { error: stderr, output: sanitized || '' };
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
