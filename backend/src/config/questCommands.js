export const QUEST_COMMANDS_MAP = {
  // ==========================================
  // MUNDO 1: EL CASTILLO DEL CONOCIMIENTO (12 misiones)
  // ==========================================
  1: {
    world: 1, title: 'El Despertar del Iniciado',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-a', '-r', '-s', '-n', '-v', '-m'],
    dangerousPatterns: []
  },
  2: {
    world: 1, title: 'Identificando el Reino',
    allowedCommands: ['cat', 'help'],
    dangerousPatterns: []
  },
  3: {
    world: 1, title: 'Las Familias del Reino',
    allowedCommands: ['ls', 'cat', 'help'],
    dangerousPatterns: []
  },
  4: {
    world: 1, title: 'El Estandarte del León',
    allowedCommands: ['which', 'help'],
    dangerousPatterns: []
  },
  5: {
    world: 1, title: 'El Lenguaje del Sistema',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-s', '-m', '-r', '-a', '-n'],
    dangerousPatterns: []
  },
  6: {
    world: 1, title: 'Sistemas Embebidos y la Nube',
    allowedCommands: ['cat', 'help'],
    dangerousPatterns: []
  },
  7: {
    world: 1, title: 'Las Herramientas Libres',
    allowedCommands: ['ls', 'cat', 'help'],
    dangerousPatterns: []
  },
  8: {
    world: 1, title: 'El Pacto de la Libertad',
    allowedCommands: ['cat', 'grep', 'help'],
    allowedFlags: ['-i', '-n', '-l'],
    dangerousPatterns: []
  },
  9: {
    world: 1, title: 'Las Licencias Sagradas',
    allowedCommands: ['ls', 'cat', 'help'],
    dangerousPatterns: []
  },
  10: {
    world: 1, title: 'El Escritorio del Guerrero',
    allowedCommands: ['cat', 'echo', 'help'],
    dangerousPatterns: []
  },
  11: {
    world: 1, title: 'La Nube Mágica',
    allowedCommands: ['curl', 'echo', 'help'],
    allowedFlags: ['-s', '--connect-timeout', '-m'],
    dangerousPatterns: []
  },
  12: {
    world: 1, title: 'Boss: El Guardián del Conocimiento',
    allowedCommands: ['uname', 'cat', 'which', 'echo', 'curl', 'ls', 'grep', 'help'],
    allowedFlags: ['-a', '-r', '-s', '-n', '-m', '--connect-timeout', '-i', '-l'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 2: LOS SENDEROS DEL SISTEMA (18 misiones)
  // ==========================================
  13: {
    world: 2, title: 'El Primer Paso del Caminante',
    allowedCommands: ['pwd', 'help'],
    dangerousPatterns: []
  },
  14: {
    world: 2, title: 'El Eco del Cambio',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  15: {
    world: 2, title: 'La Estructura del Comando',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-a', '-h', '-R', '-t', '-S'],
    dangerousPatterns: []
  },
  16: {
    world: 2, title: 'Las Variables del Entorno',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  17: {
    world: 2, title: 'Exportar el Poder',
    allowedCommands: ['export', 'echo', 'help'],
    dangerousPatterns: []
  },
  18: {
    world: 2, title: 'El Manual del Sabio',
    allowedCommands: ['man', 'help'],
    dangerousPatterns: []
  },
  19: {
    world: 2, title: 'La Búsqueda de Conocimiento',
    allowedCommands: ['apropos', 'whatis', 'type', 'help'],
    dangerousPatterns: []
  },
  20: {
    world: 2, title: 'Listando los Tesoros',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-a', '-h', '-R', '-t', '-S'],
    dangerousPatterns: []
  },
  21: {
    world: 2, title: 'La Vista Detallada',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-h', '-t', '-S', '-a', '-R'],
    dangerousPatterns: []
  },
  22: {
    world: 2, title: 'El Salto del Conejo',
    allowedCommands: ['cd', 'pwd', 'ls', 'help'],
    allowedFlags: ['-l', '-a'],
    dangerousPatterns: []
  },
  23: {
    world: 2, title: 'El Sendero Absoluto',
    allowedCommands: ['cd', 'pwd', 'ls', 'help'],
    allowedFlags: ['-l', '-a'],
    dangerousPatterns: []
  },
  24: {
    world: 2, title: 'Crear el Refugio',
    allowedCommands: ['mkdir', 'ls', 'help'],
    allowedFlags: ['-p', '-m', '-R', '-l', '-a'],
    dangerousPatterns: []
  },
  25: {
    world: 2, title: 'El Pergamino en Blanco',
    allowedCommands: ['touch', 'ls', 'help'],
    allowedFlags: ['-l'],
    dangerousPatterns: []
  },
  26: {
    world: 2, title: 'El Espejo de los Pergaminos',
    allowedCommands: ['cp', 'ls', 'help'],
    allowedFlags: ['-r', '-i', '-p', '-v', '-l', '-a'],
    dangerousPatterns: []
  },
  27: {
    world: 2, title: 'El Ritual de Renombrar',
    allowedCommands: ['mv', 'ls', 'help'],
    allowedFlags: ['-i', '-v', '-l', '-a'],
    dangerousPatterns: []
  },
  28: {
    world: 2, title: 'La Eliminación del Mal',
    allowedCommands: ['rm', 'rmdir', 'echo', 'ls', 'help'],
    allowedFlags: ['-r', '-f', '-i', '-v', '-l', '-a'],
    dangerousPatterns: [
      /rm\s+.*-[rRfF].*\s+\/(?!tmp\/linuxquest)/i
    ]
  },
  29: {
    world: 2, title: 'El Glob del Caos',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-a', '-h'],
    allowedGlobbing: true,
    dangerousPatterns: []
  },
  30: {
    world: 2, title: 'Boss: El Guardián de los Senderos',
    allowedCommands: ['mkdir', 'touch', 'cp', 'mv', 'rm', 'ls', 'pwd', 'cd', 'echo', 'help'],
    allowedFlags: ['-p', '-r', '-i', '-v', '-l', '-a', '-h', '-R'],
    dangerousPatterns: [
      /rm\s+.*-[rRfF].*\s+\/(?!tmp\/linuxquest)/i
    ]
  },

  // ==========================================
  // MUNDO 3: LAS TORRES DEL PROCESAMIENTO (18 misiones)
  // ==========================================
  31: {
    world: 3, title: 'El Poder de Grep',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-i', '-n', '-c', '-v'],
    dangerousPatterns: []
  },
  32: {
    world: 3, title: 'El Cazador Insensible',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-i', '-v', '-n', '-c'],
    dangerousPatterns: []
  },
  33: {
    world: 3, title: 'La Búsqueda Recursiva',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-r', '-l', '-c', '-i', '-n'],
    dangerousPatterns: []
  },
  34: {
    world: 3, title: 'Las Cabezas y Colas',
    allowedCommands: ['head', 'tail', 'cat', 'help'],
    allowedFlags: ['-n', '-f'],
    dangerousPatterns: []
  },
  35: {
    world: 3, title: 'El Contador de Palabras',
    allowedCommands: ['wc', 'cat', 'help'],
    allowedFlags: ['-l', '-w', '-c'],
    dangerousPatterns: []
  },
  36: {
    world: 3, title: 'El Ordenador Místico',
    allowedCommands: ['sort', 'echo', 'help'],
    allowedFlags: ['-n', '-r', '-u', '-k', '-t'],
    dangerousPatterns: []
  },
  37: {
    world: 3, title: 'Los Únicos Sobrevivientes',
    allowedCommands: ['sort', 'uniq', 'cut', 'echo', 'help'],
    allowedFlags: ['-c', '-d', '-u', '-n', '-r', '-d', '-f'],
    allowedPipes: true,
    dangerousPatterns: []
  },
  38: {
    world: 3, title: 'El Cuchillo Cortador',
    allowedCommands: ['cut', 'cat', 'head', 'help'],
    allowedFlags: ['-d', '-f', '-c'],
    dangerousPatterns: []
  },
  39: {
    world: 3, title: 'El Traductor',
    allowedCommands: ['tr', 'echo', 'cat', 'help'],
    allowedFlags: ['-d', '-s'],
    dangerousPatterns: []
  },
  40: {
    world: 3, title: 'Tuberías: El Flujo de Datos',
    allowedCommands: ['ls', 'grep', 'wc', 'echo', 'cat', 'help'],
    allowedPipes: true,
    dangerousPatterns: [
      /\|\s*rm/,
      /\|\s*dd/
    ]
  },
  41: {
    world: 3, title: 'La Redirección al Infinito',
    allowedCommands: ['echo', 'cat', 'help'],
    allowedRedirection: ['>', '>>'],
    dangerousPatterns: []
  },
  42: {
    world: 3, title: 'Los Espejos del Tee',
    allowedCommands: ['tee', 'echo', 'cat', 'help'],
    allowedFlags: ['-a'],
    allowedPipes: true,
    dangerousPatterns: []
  },
  43: {
    world: 3, title: 'El Hechizo Sed',
    allowedCommands: ['sed', 'echo', 'cat', 'help'],
    dangerousPatterns: [
      /sed\s+-i.*\/etc\//i
    ]
  },
  44: {
    world: 3, title: 'El Buscador Awk',
    allowedCommands: ['awk', 'cat', 'head', 'help'],
    allowedFlags: ['-F'],
    dangerousPatterns: []
  },
  45: {
    world: 3, title: 'La Búsqueda Rápida',
    allowedCommands: ['find', 'help'],
    allowedFlags: ['-name', '-type', '-size', '-mtime', '-user', '-perm'],
    dangerousPatterns: [
      /find.*-exec.*rm/i,
      /find.*-delete/i
    ]
  },
  46: {
    world: 3, title: 'El Compresor de Pergaminos',
    allowedCommands: ['tar', 'ls', 'echo', 'help'],
    allowedFlags: ['-c', '-x', '-z', '-j', '-v', '-f', '-t', '-C'],
    dangerousPatterns: []
  },
  47: {
    world: 3, title: 'Tu Primer Script Mágico',
    allowedCommands: ['echo', 'chmod', 'cat', 'help'],
    allowedFlags: ['+x', '-x'],
    dangerousPatterns: []
  },
  48: {
    world: 3, title: 'Boss: El Maestro del Flujo',
    allowedCommands: ['grep', 'awk', 'sed', 'sort', 'uniq', 'tar', 'echo', 'chmod', 'cat', 'head', 'tail', 'wc', 'cut', 'tr', 'find', 'help'],
    allowedPipes: true,
    dangerousPatterns: [
      /find.*-exec.*rm/i,
      /find.*-delete/i,
      /sed\s+-i.*\/etc\//i
    ]
  },

  // ==========================================
  // MUNDO 4: LA FORJA DEL NÚCLEO (17 misiones)
  // ==========================================
  49: {
    world: 4, title: '¿Quién Soy?',
    allowedCommands: ['whoami', 'id', 'help'],
    dangerousPatterns: []
  },
  50: {
    world: 4, title: 'Mi Sistema',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-r', '-m', '-a', '-s', '-n'],
    dangerousPatterns: []
  },
  51: {
    world: 4, title: 'Hora del Sistema',
    allowedCommands: ['date', 'cal', 'uptime', 'help'],
    dangerousPatterns: []
  },
  52: {
    world: 4, title: 'Procesos en Ejecución',
    allowedCommands: ['ps', 'help'],
    allowedFlags: ['aux', '-ef', '-u', '-p'],
    dangerousPatterns: []
  },
  53: {
    world: 4, title: 'Top: Monitor en Vivo',
    allowedCommands: ['top', 'help'],
    allowedFlags: ['-b', '-n'],
    dangerousPatterns: []
  },
  54: {
    world: 4, title: 'El Verdugo de Procesos',
    allowedCommands: ['kill', 'killall', 'echo', 'help'],
    allowedFlags: ['-9', '-15', '-1', '-l'],
    dangerousPatterns: []
  },
  55: {
    world: 4, title: 'Jobs y Background',
    allowedCommands: ['jobs', 'echo', 'help'],
    dangerousPatterns: []
  },
  56: {
    world: 4, title: 'Espacio en Disco',
    allowedCommands: ['df', 'du', 'help'],
    allowedFlags: ['-h', '-s', '-m', '-k'],
    dangerousPatterns: []
  },
  57: {
    world: 4, title: 'Memoria del Reino',
    allowedCommands: ['free', 'help'],
    allowedFlags: ['-h', '-m', '-g', '-k'],
    dangerousPatterns: []
  },
  58: {
    world: 4, title: 'El Camino de Red',
    allowedCommands: ['ip', 'help'],
    allowedSubcommands: ['addr', 'a', 'route', 'r', 'link'],
    dangerousPatterns: []
  },
  59: {
    world: 4, title: 'El Eco del Cielo',
    allowedCommands: ['ping', 'help'],
    allowedFlags: ['-c', '-W', '-4'],
    maxPingCount: 5,
    dangerousPatterns: []
  },
  60: {
    world: 4, title: 'El DNS Mágico',
    allowedCommands: ['host', 'nslookup', 'cat', 'help'],
    dangerousPatterns: []
  },
  61: {
    world: 4, title: 'Los Puertos del Castillo',
    allowedCommands: ['ss', 'help'],
    allowedFlags: ['-t', '-u', '-l', '-n', '-p'],
    dangerousPatterns: []
  },
  62: {
    world: 4, title: 'La Conexión SSH',
    allowedCommands: ['ssh-keygen', 'echo', 'help'],
    allowedFlags: ['-t', '-f', '-N', '-q', '-b'],
    dangerousPatterns: []
  },
  63: {
    world: 4, title: 'El Mensajero curl',
    allowedCommands: ['curl', 'echo', 'help'],
    allowedFlags: ['-s', '--connect-timeout', '-m', '-I', '-L', '-O', '-o', '-X', '-H', '-d'],
    dangerousPatterns: [
      /curl.*file:\/\//i
    ]
  },
  64: {
    world: 4, title: 'Logs del Sistema',
    allowedCommands: ['tail', 'head', 'cat', 'dmesg', 'help'],
    allowedFlags: ['-n', '-f', '-F'],
    dangerousPatterns: []
  },
  65: {
    world: 4, title: 'Boss: El Señor del Núcleo',
    allowedCommands: ['ps', 'free', 'df', 'ip', 'ping', 'ss', 'uname', 'date', 'top', 'tail', 'head', 'cat', 'echo', 'help'],
    dangerousPatterns: []
  },

  // ==========================================
  // MUNDO 5: LAS BÓVEDAS DE LA SEGURIDAD (15 misiones)
  // ==========================================
  66: {
    world: 5, title: 'Tu Identidad en el Reino',
    allowedCommands: ['whoami', 'id', 'who', 'w', 'echo', 'help'],
    dangerousPatterns: []
  },
  67: {
    world: 5, title: 'El Libro de los Usuarios',
    allowedCommands: ['cat', 'cut', 'head', 'tail', 'help'],
    allowedFlags: ['-n', '-d', '-f'],
    dangerousPatterns: []
  },
  68: {
    world: 5, title: 'Los Permisos Sagrados',
    allowedCommands: ['ls', 'stat', 'help'],
    allowedFlags: ['-l', '-a', '-d', '-c'],
    dangerousPatterns: []
  },
  69: {
    world: 5, title: 'Los Permisos en Octal',
    allowedCommands: ['stat', 'chmod', 'touch', 'ls', 'echo', 'help'],
    allowedFlags: ['-c', '-l'],
    dangerousPatterns: [
      /chmod\s*4[0-9]{3}\s*\/bin/i,
      /chmod\s*4[0-9]{3}\s*\/sbin/i
    ]
  },
  70: {
    world: 5, title: 'El Cambio Simbólico',
    allowedCommands: ['chmod', 'touch', 'ls', 'echo', 'help'],
    dangerousPatterns: [
      /chmod\s*4[0-9]{3}\s*\/bin/i,
      /chmod\s*2[0-9]{3}\s*\/sbin/i
    ]
  },
  71: {
    world: 5, title: 'La Propiedad Cambiada',
    allowedCommands: ['chown', 'chgrp', 'touch', 'ls', 'echo', 'help'],
    allowedFlags: ['-R'],
    dangerousPatterns: [
      /chown.*\/etc/i,
      /chown.*\/bin/i
    ]
  },
  72: {
    world: 5, title: 'El SUID Mágico',
    allowedCommands: ['chmod', 'ls', 'echo', 'help'],
    dangerousPatterns: [
      /chmod\s*4[0-9]{3}\s*\/bin/i,
      /chmod\s*4[0-9]{3}\s*\/sbin/i
    ]
  },
  73: {
    world: 5, title: 'El Pegajoso de /tmp',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-d', '-a'],
    dangerousPatterns: []
  },
  74: {
    world: 5, title: 'El Enlace Duro',
    allowedCommands: ['ln', 'ls', 'echo', 'cat', 'help'],
    allowedFlags: ['-l', '-i', '-s'],
    dangerousPatterns: []
  },
  75: {
    world: 5, title: 'El Enlace Suave',
    allowedCommands: ['ln', 'ls', 'echo', 'help'],
    allowedFlags: ['-s', '-l', '-f'],
    dangerousPatterns: []
  },
  76: {
    world: 5, title: 'El Grupo Sagrado',
    allowedCommands: ['cat', 'groups', 'head', 'help'],
    dangerousPatterns: []
  },
  77: {
    world: 5, title: 'Crear un Aliado',
    allowedCommands: ['echo', 'cat', 'help'],
    dangerousPatterns: []
  },
  78: {
    world: 5, title: 'Archivos Especiales',
    allowedCommands: ['ls', 'echo', 'help'],
    allowedFlags: ['-l', '-a'],
    dangerousPatterns: []
  },
  79: {
    world: 5, title: 'Logs de Seguridad',
    allowedCommands: ['tail', 'cat', 'head', 'help'],
    allowedFlags: ['-n', '-f'],
    dangerousPatterns: []
  },
  80: {
    world: 5, title: 'Boss: El Guardián Supremo',
    allowedCommands: ['whoami', 'id', 'chmod', 'chown', 'ls', 'cat', 'ln', 'echo', 'touch', 'stat', 'groups', 'help'],
    dangerousPatterns: [
      /chmod\s*4[0-9]{3}\s*\/bin/i,
      /chmod\s*4[0-9]{3}\s*\/sbin/i,
      /chown.*\/etc/i
    ]
  },

  // ==========================================
  // QUESTS EXTRA (5 misiones)
  // ==========================================
  81: {
    world: 1, title: 'El Editor de los Antiguos',
    allowedCommands: ['vi', 'echo', 'help'],
    dangerousPatterns: []
  },
  82: {
    world: 1, title: 'El Editor Moderno',
    allowedCommands: ['nano', 'echo', 'help'],
    dangerousPatterns: []
  },
  83: {
    world: 2, title: 'El Tipo de Archivo',
    allowedCommands: ['file', 'echo', 'help'],
    dangerousPatterns: []
  },
  84: {
    world: 3, title: 'La Búsqueda Rápida',
    allowedCommands: ['locate', 'echo', 'help'],
    dangerousPatterns: []
  },
  85: {
    world: 5, title: 'El Permisos de /var/tmp',
    allowedCommands: ['ls', 'echo', 'help'],
    allowedFlags: ['-l', '-d', '-a'],
    dangerousPatterns: []
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
