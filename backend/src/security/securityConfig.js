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
    MAX_MEMORY_MB: 256,
    MAX_CPU_PERCENT: 50,
    MAX_COMMAND_LENGTH: 1000, // No comandos gigantes
    MAX_ARG_LENGTH: 256, // Cada argumento limitado
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
    '/etc/ssh',
    '/etc/ssl',
    '/root',
    '/.ssh',
    '/.docker',
    '/var/run',
    '/proc/self/environ',
    '/proc/self/maps',
    '/proc/kcore',
    '/sys/kernel',
    '/sys/firmware',
    '/dev/mem',
    '/dev/kmem',
    '/dev/sda',
    '/dev/nvme',
    '/boot',
  ],

  // Comandos COMPLETAMENTE prohibidos - capacidad de daño irrecuperable
  // Estos NO tienen mocks, simplemente se rechazan
  FORBIDDEN_COMMANDS: [
    'docker',
    'docker-compose',
    'kubectl',
    'mount',
    'umount',
    'modprobe',
    'insmod',
    'rmmod',
    'kmod',
    'shutdown',
    'reboot',
    'halt',
    'poweroff',
    'init',
    'systemctl',
    'service',
    'dd',
    'mkfs',
    'fsck',
    'parted',
    'fdisk',
    'cfdisk',
    'sfdisk',
    'chroot',
    'pivot_root',
    'unshare',
    'nsenter',
    'capsh',
    'setcap',
    'getcap',
    'nc',
    'ncat',
    'socat',
    'telnet',
    'scp',
    'sftp',
    'rsync',
    'wget',
    'eval',
    'exec',
    'source',
    '.',
    'fork',
  ],

  // Patrones peligrosos que siempre se bloquean (regex)
  GLOBAL_DANGEROUS_PATTERNS: [
    // Inyección de comandos via shell metacharacters
    // NOTA: | se permite para pipes educativos (ls | grep, cat | sort, etc.)
    /[;&`]/,

    // Sustitución de comandos
    /\$\(/,
    /`[^`]*`/,

    // Redirecciones a archivos del sistema
    />\s*\/etc/i,
    />\s*\/boot/i,
    />\s*\/sys/i,
    />\s*\/proc/i,
    />\s*\/var\/log/i,
    />\s*\/dev/i,
    />\s*\/bin/i,
    />\s*\/sbin/i,
    />\s*\/usr/i,
    />\s*\/lib/i,
    />\s*\/root/i,

    // Operaciones rm peligrosas (con / al inicio o wildcards globales)
    /rm\s+.*-[rRfF].*\s+\/(?!tmp\/linuxquest)/i,
    /rm\s+.*\/\s*$/,
    /rm\s+.*\*/,

    // Acceso a archivos sensibles
    /\/etc\/shadow/i,
    /\/etc\/sudoers/i,
    /\/etc\/ssh\/ssh_host/i,
    /\/proc\/self\/environ/i,
    /\/proc\/kcore/i,
    /\/dev\/mem/i,
    /\/dev\/kmem/i,
    /\/dev\/sd[a-z]/i,

    // chmod peligroso (777 o setuid global)
    /chmod\s+[0-9]?[67]7[0-9]{1,2}\s+\//,
    /chmod\s+\+s\s+\//,
    /chmod\s+u\+s\s+\//,

    // Fork bombs y bucles infinitos obvios
    /:\(\)\s*\{\s*:\|:&\s*\}/,
    // NOTA: while true / while : son legítimos para aprender scripting (Mundo 5)
    // Se bloquean solo en quests que no son de scripting via per-quest patterns

    // Variables de entorno peligrosas
    /LD_PRELOAD\s*=/i,
    /LD_LIBRARY_PATH\s*=/i,
    /PATH\s*=\s*[^a-zA-Z]/i,

    // Tuberías a comandos peligrosos (estos comandos están bloqueados, doble defensa)
    /\|\s*(nc|ncat|socat|telnet|wget)\b/i,

    // Acceso al socket de Docker
    /\/var\/run\/docker\.sock/i,

    // Escapes via /proc
    /\/proc\/[0-9]+\/(root|cwd|exe|fd)/i,

    // Ejecución de binarios desde directorios escribibles
    /\/tmp\/[^\s]*\.(sh|bin|elf|out|exe)/i,
  ],

  // Comandos permitidos por defecto (si no se especifica en la misión)
  DEFAULT_ALLOWED_COMMANDS: [
    // Básicos
    'help', 'pwd', 'ls', 'cd', 'echo', 'cat', 'touch', 'mkdir', 'rm', 'mv', 'cp',
    // Búsqueda y procesamiento
    'find', 'grep', 'sed', 'awk', 'sort', 'uniq', 'wc', 'head', 'tail', 'tr',
    'cut', 'paste', 'comm', 'diff', 'file', 'stat', 'tee', 'xargs',
    // Sistema e info
    'whoami', 'id', 'who', 'uname', 'date', 'uptime', 'hostname', 'nproc',
    'env', 'printenv', 'history', 'clear', 'which', 'type',
    // Documentación
    'man', 'apropos', 'less', 'more', 'tac', 'base64', 'md5sum', 'sha256sum',
    // Procesos
    'ps', 'top', 'kill', 'killall', 'pkill', 'jobs', 'bg', 'fg', 'nohup', 'sleep',
    // Disco y memoria
    'df', 'du',     'lsblk', 'free', 'lscpu', 'lsusb', 'lspci', 'dmesg',
    // Red
    'ip', 'ping', 'host', 'dig', 'nslookup', 'ss', 'netstat', 'ifconfig',
    'curl', 'ssh', 'ssh-keygen',
    // Compresión
    'tar', 'gzip', 'gunzip', 'zip', 'unzip', 'bzip2', 'bunzip2', 'xz', 'unxz',
    // Permisos y usuarios
    'chmod', 'chown', 'chgrp', 'ln', 'umask', 'getfacl', 'setfacl',
    'useradd', 'usermod', 'groupadd', 'passwd', 'su', 'sudo',
    'locate', 'updatedb', 'groups', 'newgrp', 'finger',
    'last', 'lastlog', 'chage', 'gpasswd', 'userdel', 'groupdel',
    // Criptografía
    'gpg',
    // Editores
    'vi', 'nano',
    // Seguridad/auditoría
    'iptables',
    // Misc
    'seq', 'yes', 'rev', 'column', 'fmt', 'fold', 'nl', 'od', 'strings',
    'screen', 'tmux', 'timeout', 'test', 'true', 'false', 'printf',
    'read', 'shift', 'return', 'exit', 'trap',
    'wait', 'getopts', 'alias', 'unalias', 'export', 'set', 'unset',
    'shopt', 'complete', 'compgen', 'builtin', 'command',
  ],

  // Argumentos peligrosos por comando (defensa profunda)
  DANGEROUS_COMMAND_ARGS: {
    rm: [/-[rRfF]+.*\//, /--no-preserve-root/i, /\/\s*$/],
    chmod: [/777/, /666/, /\+s/, /u\+s/, /g\+s/],
    chown: [/root/i, /\s+0:0/, /-R.*\//],
    find: [/-exec/i, /-delete/i, /-execdir/i],
    cp: [/\/sys\//i, /\/proc\//i],
    mv: [/\/sys\//i, /\/proc\//i],
    ln: [/\/sys\//i, /\/proc\//i],
    cat: [/\/proc\/[0-9]+\/mem/i],
    head: [],
    tail: [],
    grep: [/-r.*\/etc/i],
    sed: [/-i.*\/etc\/shadow/i, /-i.*\/etc\/sudoers/i, /-i.*\/sys\//i],
    awk: [/system\(/i, /getline.*\|/i],
    curl: [/file:\/\//i, /-o\s+\/etc/i, /-o\s+\/bin/i, /\bgopher:\/\//i, /\bdict:\/\//i, /\bldap:\/\//i],
    ssh: [/-o\s*ProxyCommand/i, /-o\s*LocalCommand/i],
  },

  // Configuración por misión (sobrescribe defaults)
  MISSION_OVERRIDES: {
    1: { allowedCommands: ['uname', 'help'], maxExecutionTime: 10000 },
    2: { allowedCommands: ['cat', 'help'], maxExecutionTime: 10000 },
  },

  // Comportamiento ante violaciones
  VIOLATION_BEHAVIOR: {
    SOFT_BLOCK: 'soft_block',
    HARD_BLOCK: 'hard_block',
    WARN_ONLY: 'warn_only',
  },

  AUDIT_LEVELS: {
    OFF: 0,
    CRITICAL_ONLY: 1,
    VIOLATIONS_ONLY: 2,
    COMPREHENSIVE: 3,
  },

  CURRENT_AUDIT_LEVEL: 3,
};

/**
 * Valida si un comando está globalmente permitido (no en blacklist)
 */
export const isGloballyAllowedCommand = (command) => {
  const baseCmd = command.trim().split(/\s+/)[0];

  if (SECURITY_CONFIG.FORBIDDEN_COMMANDS.includes(baseCmd)) {
    return false;
  }

  return true;
};

/**
 * Verifica si los argumentos de un comando contienen patrones peligrosos
 * Devuelve { safe: bool, reason: string }
 */
export const validateCommandArgs = (command) => {
  const parts = command.trim().split(/\s+/);
  const baseCmd = parts[0];
  const args = parts.slice(1).join(' ');

  // Validar longitud total
  if (command.length > SECURITY_CONFIG.COMMAND_LIMITS.MAX_COMMAND_LENGTH) {
    return { safe: false, reason: 'Comando excede longitud máxima' };
  }

  // Validar longitud de cada argumento
  for (const arg of parts.slice(1)) {
    if (arg.length > SECURITY_CONFIG.COMMAND_LIMITS.MAX_ARG_LENGTH) {
      return { safe: false, reason: 'Argumento demasiado largo' };
    }
  }

  // Validar contra patrones específicos del comando
  const dangerousPatterns = SECURITY_CONFIG.DANGEROUS_COMMAND_ARGS[baseCmd];
  if (dangerousPatterns) {
    for (const pattern of dangerousPatterns) {
      if (pattern.test(args)) {
        return {
          safe: false,
          reason: `Argumento bloqueado para ${baseCmd}: posible operación peligrosa`
        };
      }
    }
  }

  return { safe: true };
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
