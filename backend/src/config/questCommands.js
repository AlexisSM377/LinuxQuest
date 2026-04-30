// Comandos permitidos POR MISIÓN - Alineado con seed-quests.js
// Cada quest tiene sus comandos, flags y restricciones específicas

export const QUEST_COMMANDS_MAP = {
  // ==========================================
  // MUNDO 1: CASTILLO DE LINUX (IDs 1-15)
  // ==========================================
  1: {
    world: 1, title: 'El Despertar del Iniciado',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-a', '-r', '-s', '-n', '-v'],
    dangerousPatterns: []
  },
  2: {
    world: 1, title: 'Identificando el Reino',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/os-release'],
    dangerousPatterns: []
  },
  3: {
    world: 1, title: 'El Pergamino de las Familias',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/os-release'],
    dangerousPatterns: []
  },
  4: {
    world: 1, title: 'El Estandarte del León',
    allowedCommands: ['which', 'help'],
    dangerousPatterns: []
  },
  5: {
    world: 1, title: 'Los Tesoros de Office',
    allowedCommands: ['which', 'help'],
    dangerousPatterns: []
  },
  6: {
    world: 1, title: 'El Camino del Servidor',
    allowedCommands: ['which', 'help'],
    dangerousPatterns: []
  },
  7: {
    world: 1, title: 'El Pacto de la Libertad',
    allowedCommands: ['ls', 'help'],
    dangerousPatterns: []
  },
  8: {
    world: 1, title: 'Las Diez Licencias',
    allowedCommands: ['ls', 'cat', 'help'],
    dangerousPatterns: []
  },
  9: {
    world: 1, title: 'Los Embajadores Libres',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-r', '-i'],
    dangerousPatterns: []
  },
  10: {
    world: 1, title: 'El Escritorio Místico',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  11: {
    world: 1, title: 'La Nube Mágica',
    allowedCommands: ['curl', 'help'],
    allowedFlags: ['-s', '-I'],
    timeout: 10000,
    dangerousPatterns: [/curl.*localhost.*:3000/]
  },
  12: {
    world: 1, title: 'Los Sistemas Embebidos',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-m'],
    dangerousPatterns: []
  },
  13: {
    world: 1, title: 'El Desafío del Encriptado',
    allowedCommands: ['gpg', 'help'],
    allowedFlags: ['--version'],
    dangerousPatterns: []
  },
  14: {
    world: 1, title: 'El Guardián de la Privacidad',
    allowedCommands: ['curl', 'help'],
    allowedFlags: ['-I', '-s'],
    timeout: 10000,
    dangerousPatterns: []
  },
  15: {
    world: 1, title: 'Boss: Guardián del Conocimiento Libre',
    allowedCommands: ['uname', 'cat', 'curl', 'ls', 'which', 'help'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 2: CAMINOS PERDIDOS (IDs 16-35)
  // ==========================================
  16: {
    world: 2, title: 'El Primer Paso del Caminante',
    allowedCommands: ['pwd', 'echo', 'help'],
    dangerousPatterns: []
  },
  17: {
    world: 2, title: 'El Eco del Cambio',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  18: {
    world: 2, title: 'Listando los Tesoros',
    allowedCommands: ['ls', 'help'],
    dangerousPatterns: []
  },
  19: {
    world: 2, title: 'Los Secretos Ocultos',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-a', '-la'],
    dangerousPatterns: []
  },
  20: {
    world: 2, title: 'La Vista Detallada',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-la'],
    dangerousPatterns: []
  },
  21: {
    world: 2, title: 'Los Tamaños Humanos',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-lh', '-lah'],
    dangerousPatterns: []
  },
  22: {
    world: 2, title: 'El Salto del Conejo',
    allowedCommands: ['cd', 'pwd', 'help'],
    allowedPaths: ['..', '../..', '~'],
    dangerousPatterns: []
  },
  23: {
    world: 2, title: 'El Sendero Absoluto',
    allowedCommands: ['cd', 'pwd', 'help'],
    allowedPaths: ['/tmp', '/'],
    dangerousPatterns: []
  },
  24: {
    world: 2, title: 'Crear el Refugio',
    allowedCommands: ['mkdir', 'ls', 'help'],
    dangerousPatterns: [/rm\s+-/, /rmdir/],
    sandboxOnly: true
  },
  25: {
    world: 2, title: 'El Pergamino en Blanco',
    allowedCommands: ['touch', 'ls', 'help'],
    dangerousPatterns: [/rm\s+/],
    sandboxOnly: true
  },
  26: {
    world: 2, title: 'La Ruta Perfecta',
    allowedCommands: ['mkdir', 'ls', 'help'],
    allowedFlags: ['-p'],
    dangerousPatterns: [/rm\s+-/],
    sandboxOnly: true
  },
  27: {
    world: 2, title: 'El Espejo de los Pergaminos',
    allowedCommands: ['cp', 'touch', 'ls', 'help'],
    allowedFlags: ['-i', '-p', '-r'],
    dangerousPatterns: [/rm\s+/],
    sandboxOnly: true
  },
  28: {
    world: 2, title: 'El Ritual de Renombrar',
    allowedCommands: ['mv', 'touch', 'ls', 'help'],
    allowedFlags: ['-i'],
    dangerousPatterns: [/rm\s+/],
    sandboxOnly: true
  },
  29: {
    world: 2, title: 'La Eliminación del Mal',
    allowedCommands: ['rm', 'touch', 'ls', 'help'],
    allowedFlags: ['-i'],
    dangerousPatterns: [/rm\s+-r/, /rm\s+-f/, /rm\s+-rf/],
    sandboxOnly: true,
    warningMessage: 'Comando destructivo. Se ejecutará en sandbox.'
  },
  30: {
    world: 2, title: 'El Manual del Sabio',
    allowedCommands: ['man', 'help'],
    dangerousPatterns: []
  },
  31: {
    world: 2, title: 'La Búsqueda de Conocimiento',
    allowedCommands: ['apropos', 'man', 'help'],
    dangerousPatterns: []
  },
  32: {
    world: 2, title: 'La Variable Mística',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  33: {
    world: 2, title: 'Archivos Ocultos: El Punto',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-a', '-la'],
    dangerousPatterns: []
  },
  34: {
    world: 2, title: 'El Glob del Caos',
    allowedCommands: ['ls', 'touch', 'help'],
    allowedGlobbing: true,
    dangerousPatterns: []
  },
  35: {
    world: 2, title: 'Boss: Maestro de Caminos',
    allowedCommands: ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'cat', 'cp', 'mv', 'rm', 'help'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 3: TORRES ANTIGUAS DEL PODER (IDs 36-50)
  // ==========================================
  36: {
    world: 3, title: 'El Poder de Grep',
    allowedCommands: ['grep', 'echo', 'help'],
    allowedFlags: ['-i', '-n', '-c', '-v'],
    dangerousPatterns: []
  },
  37: {
    world: 3, title: 'Tuberías: El Flujo de Datos',
    allowedCommands: ['ls', 'grep', 'echo', 'help'],
    allowedPipes: true,
    dangerousPatterns: [/\|\s*rm/, /\|\s*dd/],
    maxPipeDepth: 3
  },
  38: {
    world: 3, title: 'La Redirección al Infinito',
    allowedCommands: ['echo', 'ls', 'help'],
    allowedRedirection: ['>', '>>'],
    dangerousPatterns: [/>\s*\/etc/, />\s*\/dev/],
    sandboxOnly: true
  },
  39: {
    world: 3, title: 'Los Espejos del Tee',
    allowedCommands: ['ls', 'tee', 'help'],
    allowedPipes: true,
    dangerousPatterns: [],
    sandboxOnly: true
  },
  40: {
    world: 3, title: 'El Cazador de Patrones',
    allowedCommands: ['grep', 'echo', 'help'],
    allowedFlags: ['-i', '-n', '-c', '-v', '-r'],
    maxRegexComplexity: 3,
    dangerousPatterns: []
  },
  41: {
    world: 3, title: 'Las Mil Búsquedas',
    allowedCommands: ['grep', 'echo', 'help'],
    allowedFlags: ['-r', '-i', '-n', '-l'],
    dangerousPatterns: [/grep\s+-r\s+\/etc/]
  },
  42: {
    world: 3, title: 'El Conjuro Insensible',
    allowedCommands: ['grep', 'echo', 'help'],
    allowedFlags: ['-i', '-n'],
    dangerousPatterns: []
  },
  43: {
    world: 3, title: 'La Inversión Sagrada',
    allowedCommands: ['grep', 'echo', 'help'],
    allowedFlags: ['-v', '-n'],
    dangerousPatterns: []
  },
  44: {
    world: 3, title: 'Las Cabezas y Colas',
    allowedCommands: ['head', 'tail', 'echo', 'seq', 'help'],
    allowedFlags: ['-n', '-f'],
    dangerousPatterns: []
  },
  45: {
    world: 3, title: 'El Ordenador Místico',
    allowedCommands: ['sort', 'echo', 'help'],
    allowedFlags: ['-n', '-r', '-u'],
    dangerousPatterns: []
  },
  46: {
    world: 3, title: 'Los Únicos Sobrevivientes',
    allowedCommands: ['sort', 'uniq', 'echo', 'help'],
    allowedPipes: true,
    allowedFlags: ['-c', '-u'],
    dangerousPatterns: []
  },
  47: {
    world: 3, title: 'El Cuchillo Cortador',
    allowedCommands: ['cut', 'echo', 'help'],
    allowedFlags: ['-d', '-f', '-c'],
    dangerousPatterns: []
  },
  48: {
    world: 3, title: 'El Hechizo Sed',
    allowedCommands: ['sed', 'echo', 'help'],
    allowedFlags: ['-i', '-n', '-e'],
    maxSedComplexity: 3,
    sandboxOnly: true
  },
  49: {
    world: 3, title: 'El Buscador Awk',
    allowedCommands: ['awk', 'echo', 'help'],
    allowedFlags: ['-F'],
    maxAwkComplexity: 3,
    sandboxOnly: true
  },
  50: {
    world: 3, title: 'Boss: Maestro del Flujo',
    allowedCommands: ['grep', 'sed', 'awk', 'sort', 'uniq', 'cut', 'head', 'tail', 'echo', 'help'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 4: NÚCLEO DEL REINO (IDs 51-70)
  // ==========================================
  51: {
    world: 4, title: '¿Quién Soy?',
    allowedCommands: ['whoami', 'help'],
    dangerousPatterns: []
  },
  52: {
    world: 4, title: 'Mi Sistema',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-a', '-r', '-s'],
    dangerousPatterns: []
  },
  53: {
    world: 4, title: 'Hora del Sistema',
    allowedCommands: ['date', 'help'],
    dangerousPatterns: []
  },
  54: {
    world: 4, title: 'Procesos en Ejecución',
    allowedCommands: ['ps', 'help'],
    allowedFlags: ['aux', 'ef', '-u'],
    dangerousPatterns: []
  },
  55: {
    world: 4, title: 'Top: Monitor en Tiempo Real',
    allowedCommands: ['top', 'help'],
    allowedFlags: ['-b', '-n'],
    timeout: 5000,
    dangerousPatterns: []
  },
  56: {
    world: 4, title: 'El Verdugo de Procesos',
    allowedCommands: ['kill', 'ps', 'help'],
    allowedFlags: ['-9', '-15'],
    dangerousPatterns: [/kill\s+-9\s+1/, /kill\s+-9\s+0/],
    warningMessage: 'Comando delicado.'
  },
  57: {
    world: 4, title: 'Espacio en Disco',
    allowedCommands: ['df', 'help'],
    allowedFlags: ['-h', '-T'],
    dangerousPatterns: []
  },
  58: {
    world: 4, title: 'Du: Tamaño de Directorios',
    allowedCommands: ['du', 'help'],
    allowedFlags: ['-sh', '-s', '-h'],
    dangerousPatterns: []
  },
  59: {
    world: 4, title: 'Free: Memoria RAM',
    allowedCommands: ['free', 'help'],
    allowedFlags: ['-h', '-m', '-g'],
    dangerousPatterns: []
  },
  60: {
    world: 4, title: 'Uptime: Tiempo del Sistema',
    allowedCommands: ['uptime', 'help'],
    dangerousPatterns: []
  },
  61: {
    world: 4, title: 'El Camino de Red',
    allowedCommands: ['ip', 'help'],
    allowedSubcommands: ['addr', 'address', 'a'],
    dangerousPatterns: [/ip\s+addr\s+add/, /ip\s+addr\s+del/]
  },
  62: {
    world: 4, title: 'Las Rutas del Mensajero',
    allowedCommands: ['ip', 'help'],
    allowedSubcommands: ['route', 'r'],
    dangerousPatterns: [/ip\s+route\s+add/, /ip\s+route\s+del/]
  },
  63: {
    world: 4, title: 'El Eco del Cielo',
    allowedCommands: ['ping', 'help'],
    allowedFlags: ['-c', '-i', '-W'],
    maxPingCount: 10,
    timeout: 10000,
    dangerousPatterns: []
  },
  64: {
    world: 4, title: 'El DNS Mágico',
    allowedCommands: ['host', 'dig', 'nslookup', 'help'],
    dangerousPatterns: []
  },
  65: {
    world: 4, title: 'Los Puertos del Castillo',
    allowedCommands: ['ss', 'netstat', 'help'],
    allowedFlags: ['-tuln', '-t', '-u', '-l'],
    dangerousPatterns: []
  },
  66: {
    world: 4, title: 'La Conexión SSH',
    allowedCommands: ['ssh-keygen', 'help'],
    allowedFlags: ['-t', '-b', '-f', '-N'],
    sandboxOnly: true,
    warningMessage: 'Generará claves en sandbox.'
  },
  67: {
    world: 4, title: 'El Mensajero curl',
    allowedCommands: ['curl', 'help'],
    allowedFlags: ['-s', '-I', '-X', '-O'],
    timeout: 10000,
    dangerousPatterns: [/curl.*localhost.*:3000/]
  },
  68: {
    world: 4, title: 'Los Ríos USB',
    allowedCommands: ['lsusb', 'help'],
    dangerousPatterns: []
  },
  69: {
    world: 4, title: 'El Mensaje del Kernel',
    allowedCommands: ['dmesg', 'tail', 'grep', 'help'],
    allowedFlags: ['-T', '-n'],
    dangerousPatterns: []
  },
  70: {
    world: 4, title: 'Boss: Señor del Núcleo',
    allowedCommands: ['whoami', 'uname', 'date', 'ps', 'df', 'free', 'uptime', 'ip', 'ping', 'host', 'ss', 'curl', 'lsusb', 'dmesg', 'top', 'du', 'kill', 'ssh-keygen', 'help'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 5: BÓVEDAS SECRETAS (IDs 71-90)
  // ==========================================
  71: {
    world: 5, title: 'Tu Identidad en el Reino',
    allowedCommands: ['whoami', 'help'],
    dangerousPatterns: []
  },
  72: {
    world: 5, title: 'Los Detalles del Ser',
    allowedCommands: ['id', 'help'],
    dangerousPatterns: []
  },
  73: {
    world: 5, title: 'Los Ojos del Castillo',
    allowedCommands: ['who', 'help'],
    dangerousPatterns: []
  },
  74: {
    world: 5, title: 'El Libro de los Usuarios',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/passwd'],
    dangerousPatterns: [/cat\s+\/etc\/shadow/]
  },
  75: {
    world: 5, title: 'Los Permisos Sagrados',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-la', '-l', '-ld'],
    dangerousPatterns: []
  },
  76: {
    world: 5, title: 'El Cambio de Permisos Numérico',
    allowedCommands: ['chmod', 'ls', 'touch', 'help'],
    allowedFlags: ['755', '644', '700', '600', '777'],
    sandboxOnly: true,
    warningMessage: 'Modifica permisos. Solo en sandbox.'
  },
  77: {
    world: 5, title: 'El Cambio Simbólico',
    allowedCommands: ['chmod', 'ls', 'touch', 'help'],
    allowedFlags: ['u+x', 'g-w', 'o=r', 'a+r', '-w'],
    sandboxOnly: true
  },
  78: {
    world: 5, title: 'La Propiedad Cambiada',
    allowedCommands: ['chown', 'ls', 'touch', 'help'],
    allowedFlags: ['-R'],
    sandboxOnly: true
  },
  79: {
    world: 5, title: 'El SUID Mágico',
    allowedCommands: ['chmod', 'ls', 'touch', 'help'],
    allowedFlags: ['u+s', 'g+s'],
    sandboxOnly: true,
    warningMessage: 'SUID es peligroso. Usar con cuidado.'
  },
  80: {
    world: 5, title: 'El Pegajoso de /tmp',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-ld'],
    restrictedPaths: ['/tmp'],
    dangerousPatterns: []
  },
  81: {
    world: 5, title: 'El Enlace Duro',
    allowedCommands: ['ln', 'echo', 'ls', 'cat', 'help'],
    sandboxOnly: true
  },
  82: {
    world: 5, title: 'El Enlace Suave',
    allowedCommands: ['ln', 'echo', 'ls', 'help'],
    allowedFlags: ['-s'],
    sandboxOnly: true
  },
  83: {
    world: 5, title: 'El Grupo Sagrado',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/group'],
    dangerousPatterns: []
  },
  84: {
    world: 5, title: 'Archivos Especiales: /dev',
    allowedCommands: ['ls', 'help'],
    restrictedPaths: ['/dev'],
    dangerousPatterns: [/cat\s+\/dev\/(sda|sdb|mem|kmem)/]
  },
  85: {
    world: 5, title: 'Archivos de Configuración',
    allowedCommands: ['ls', 'help'],
    restrictedPaths: ['/etc'],
    dangerousPatterns: [/rm.*\/etc/, /mv.*\/etc/]
  },
  86: {
    world: 5, title: 'Logs del Sistema',
    allowedCommands: ['cat', 'tail', 'ls', 'help'],
    allowedFlags: ['-n', '-f'],
    restrictedPaths: ['/var/log'],
    dangerousPatterns: [/rm.*\/var\/log/]
  },
  87: {
    world: 5, title: 'Firewall Básico: iptables',
    allowedCommands: ['iptables', 'help'],
    allowedFlags: ['-L', '-n'],
    dangerousPatterns: [/iptables.*ACCEPT.*0\.0\.0\.0/],
    sandboxOnly: true,
    warningMessage: 'iptables es crítico. Sé cuidadoso.'
  },
  88: {
    world: 5, title: 'SSH y Criptografía',
    allowedCommands: ['ssh-keygen', 'help'],
    allowedFlags: ['-t', '-b', '-f', '-N'],
    sandboxOnly: true
  },
  89: {
    world: 5, title: 'Seguridad en Contraseñas',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/login.defs'],
    dangerousPatterns: []
  },
  90: {
    world: 5, title: 'Boss: Guardián Supremo',
    allowedCommands: ['whoami', 'id', 'chmod', 'chown', 'chgrp', 'ls', 'cat', 'ln', 'echo', 'touch', 'iptables', 'ssh-keygen', 'vi', 'nano', 'locate', 'help'],
    dangerousPatterns: [/rm\s+(-r|-f|--recursive|--force)[\s\w\/.-]*(\/|\*|\.\.)/i]
  },

  // ==========================================
  // QUESTS EXTRA (IDs 91-95)
  // ==========================================
  91: {
    world: 2, title: 'El Rango Mágico',
    allowedCommands: ['ls', 'touch', 'help'],
    allowedGlobbing: true,
    dangerousPatterns: []
  },
  92: {
    world: 3, title: 'El Editor de los Antiguos',
    allowedCommands: ['vi', 'help'],
    dangerousPatterns: []
  },
  93: {
    world: 3, title: 'El Editor Moderno',
    allowedCommands: ['nano', 'help'],
    dangerousPatterns: []
  },
  94: {
    world: 4, title: 'La Búsqueda Rápida',
    allowedCommands: ['locate', 'updatedb', 'help'],
    dangerousPatterns: []
  },
  95: {
    world: 5, title: 'El Grupo Cambiado',
    allowedCommands: ['chgrp', 'ls', 'touch', 'groups', 'help'],
    sandboxOnly: true
  }
};

export const getQuestCommandConfig = (questId) => {
  return QUEST_COMMANDS_MAP[questId] || {
    allowedCommands: ['help'],
    dangerousPatterns: [],
    sandboxOnly: false
  };
};

export const validateCommandForQuest = (command, questId) => {
  const config = getQuestCommandConfig(questId);
  const baseCmd = command.trim().split(/\s+/)[0];

  if (!config.allowedCommands.includes(baseCmd)) {
    return {
      isAllowed: false,
      reason: `Este comando no está permitido en esta misión. Permitidos: ${config.allowedCommands.join(', ')}`
    };
  }

  for (const pattern of config.dangerousPatterns) {
    if (pattern.test(command)) {
      return {
        isAllowed: false,
        reason: 'Este comando contiene operaciones peligrosas para esta misión.'
      };
    }
  }

  if (config.sandboxOnly) {
    return {
      isAllowed: true,
      sandbox: true,
      warning: config.warningMessage || 'Este comando requiere ejecución en sandbox.'
    };
  }

  return { isAllowed: true };
};
