/**
 * Configuración centralizada de seguridad para LinuxQuest
 * Define límites, restricciones y políticas de seguridad
 */

export const SECURITY_CONFIG = {
  // Límites de recursos por comando
  COMMAND_LIMITS: {
    MAX_EXECUTION_TIME: 30000, // 30 segundos
    MAX_OUTPUT_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_OUTPUT_LINES: 10000,
    MAX_MEMORY_MB: 256, // Máximo de memoria que puede usar un comando
    MAX_CPU_PERCENT: 50, // Máximo de CPU
  },

  // Límites por usuario
  USER_LIMITS: {
    MAX_SANDBOX_SIZE: 100 * 1024 * 1024, // 100MB por usuario
    COMMANDS_PER_MINUTE: 60,
    COMMANDS_PER_HOUR: 1000,
    MAX_CONCURRENT_COMMANDS: 3,
  },

  // Directorios prohibidos (no pueden ser accedidos ni modificados)
  FORBIDDEN_PATHS: [
    '/etc/passwd',
    '/etc/shadow',
    '/etc/sudoers',
    '/etc/sudoers.d',
    '/root',
    '/.ssh',
    '/.docker',
    '/var/log',
    '/var/run',
    '/proc',
    '/sys',
    '/dev',
    '/boot',
    '/bin',
    '/sbin',
    '/usr/bin',
    '/usr/sbin',
    '/lib',
    '/lib64',
  ],

  // Comandos completamente prohibidos (nunca pueden ejecutarse)
  FORBIDDEN_COMMANDS: [
    'sudo',
    'su',
    'docker',
    'mount',
    'umount',
    'modprobe',
    'insmod',
    'rmmod',
    'shutdown',
    'reboot',
    'halt',
    'poweroff',
    'systemctl',
    'systemd',
    'dd',
    'mkfs',
    'fsck',
    'parted',
    'fdisk',
    'chroot',
    'pivot_root',
    'iptables',
    'ip6tables',
    'nc',
    'ncat',
    'socat',
    'telnet',
    'ssh',
    'scp',
    'sftp',
  ],

  // Comandos permitidos por defecto (si no se especifica en la misión)
  DEFAULT_ALLOWED_COMMANDS: [
    'help',
    'pwd',
    'ls',
    'cd',
    'echo',
    'cat',
    'touch',
    'mkdir',
    'rm',
    'mv',
    'cp',
    'find',
    'grep',
    'sed',
    'awk',
    'sort',
    'uniq',
    'wc',
    'head',
    'tail',
    'tr',
    'cut',
    'paste',
    'comm',
    'diff',
    'patch',
    'file',
    'stat',
    'whoami',
    'uname',
    'date',
    'uptime',
    'hostname',
    'env',
    'printenv',
    'history',
    'clear',
    'man',
    'whatis',
    'apropos',
    'less',
    'more',
    'tac',
    'base64',
    'md5sum',
    'sha256sum',
    'crc32',
  ],

  // Patrones peligrosos que siempre se bloquean
  GLOBAL_DANGEROUS_PATTERNS: [
    // Shell metacharacters en contextos específicos
    /[`;|&]\s*(rm|dd|mkfs|shutdown|reboot|poweroff|chmod|chown)/i,

    // Redirecciones peligrosas
    />\s*\/etc|>\s*\/boot|>\s*\/sys|>\s*\/proc|>\s*\/var\/log/i,

    // Operaciones recursivas peligrosas
    /rm\s+(-r|-f|-rf|--recursive|--force)[\s\*\/]/i,

    // Cambios de permisos globales
    /chmod\s+[0-9]*7[0-9]{2,}/,

    // Acceso a shadow/passwd
    /cat|grep|sed|awk.*\/etc\/(passwd|shadow)/i,

    // Ejecución de shell arbitraria
    /\$\(.*\)|`.*`|eval\(|exec\(|bash\s+(-i|-l|<)/i,

    // Tuberías a comandos peligrosos
    /\|\s*(nc|ncat|socat|telnet|ssh|docker|curl)/i,

    // Variables de entorno peligrosas
    /LD_PRELOAD|LD_LIBRARY_PATH|PATH.*=.*(:|\/tmp|\.)/i,
  ],

  // Configuración por misión (sobrescribe defaults)
  MISSION_OVERRIDES: {
    // Misiones pueden restringir aún más si es necesario
    // Ejemplo: misión que enseña solo pwd
    1: {
      allowedCommands: ['uname', 'help'],
      maxExecutionTime: 10000,
    },
    2: {
      allowedCommands: ['cat', 'help'],
      maxExecutionTime: 10000,
    },
  },

  // Comportamiento ante violaciones
  VIOLATION_BEHAVIOR: {
    SOFT_BLOCK: 'soft_block', // Bloquea pero permite intentos
    HARD_BLOCK: 'hard_block', // Bloquea y registra crítico
    WARN_ONLY: 'warn_only', // Solo advierte
  },

  // Niveles de auditoría
  AUDIT_LEVELS: {
    OFF: 0,
    CRITICAL_ONLY: 1,
    VIOLATIONS_ONLY: 2,
    COMPREHENSIVE: 3, // Registra todo
  },

  // Nivel de auditoría actual
  CURRENT_AUDIT_LEVEL: 3, // COMPREHENSIVE
};

/**
 * Valida si un comando está permitido globalmente
 */
export const isGloballyAllowedCommand = (command) => {
  const baseCmd = command.trim().split(/\s+/)[0];

  if (SECURITY_CONFIG.FORBIDDEN_COMMANDS.includes(baseCmd)) {
    return false;
  }

  return true;
};

/**
 * Obtiene comandos permitidos para una misión
 */
export const getAllowedCommandsForMission = (missionId) => {
  if (SECURITY_CONFIG.MISSION_OVERRIDES[missionId]) {
    return SECURITY_CONFIG.MISSION_OVERRIDES[missionId].allowedCommands ||
           SECURITY_CONFIG.DEFAULT_ALLOWED_COMMANDS;
  }
  return SECURITY_CONFIG.DEFAULT_ALLOWED_COMMANDS;
};

/**
 * Obtiene el timeout para una misión
 */
export const getTimeoutForMission = (missionId) => {
  if (SECURITY_CONFIG.MISSION_OVERRIDES[missionId]?.maxExecutionTime) {
    return SECURITY_CONFIG.MISSION_OVERRIDES[missionId].maxExecutionTime;
  }
  return SECURITY_CONFIG.COMMAND_LIMITS.MAX_EXECUTION_TIME;
};

export default SECURITY_CONFIG;
