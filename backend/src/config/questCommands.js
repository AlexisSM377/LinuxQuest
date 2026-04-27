// Comandos permitidos POR MISIÓN basado en LPI Linux Essentials
// Esto asegura que estudiantes solo usen lo que necesitan aprender

export const QUEST_COMMANDS_MAP = {
  // MUNDO 1: CASTILLO DE LINUX (Tema 1 - Community & History)
  1: {
    world: 1,
    title: 'El Despertar del Iniciado',
    allowedCommands: ['uname', 'help'],
    dangerousPatterns: []
  },
  2: {
    world: 1,
    title: 'Identificando el Reino',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/os-release'],
    dangerousPatterns: []
  },
  3: {
    world: 1,
    title: 'El Pergamino de las Familias',
    allowedCommands: ['pwd', 'help'],
    dangerousPatterns: []
  },

  // MUNDO 2: CAMINOS PERDIDOS (Tema 2 - Finding Way)
  4: {
    world: 2,
    title: 'El Primer Paso del Caminante',
    allowedCommands: ['pwd', 'help'],
    dangerousPatterns: []
  },
  5: {
    world: 2,
    title: 'El Mapa del Hogar',
    allowedCommands: ['cd', 'pwd', 'help'],
    allowedPaths: ['~', '/home'],
    dangerousPatterns: []
  },
  6: {
    world: 2,
    title: 'Inspecciona el Reino',
    allowedCommands: ['ls', 'help'],
    dangerousPatterns: []
  },
  7: {
    world: 2,
    title: 'Los Secretos Ocultos',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-a', '-la', '-lah'],
    dangerousPatterns: []
  },
  8: {
    world: 2,
    title: 'La Vista Detallada',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-l', '-la', '-lah'],
    dangerousPatterns: []
  },
  9: {
    world: 2,
    title: 'Los Tamaños Humanos',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-lh', '-lah'],
    dangerousPatterns: []
  },
  10: {
    world: 2,
    title: 'El Salto del Conejo',
    allowedCommands: ['cd', 'pwd', 'help'],
    allowedPaths: ['..', '../..'],
    dangerousPatterns: []
  },
  11: {
    world: 2,
    title: 'El Sendero Absoluto',
    allowedCommands: ['cd', 'pwd', 'help'],
    allowedPaths: ['/tmp', '/'],
    dangerousPatterns: []
  },
  12: {
    world: 2,
    title: 'Crear el Refugio',
    allowedCommands: ['mkdir', 'ls', 'help'],
    restrictedCommands: ['mkdir -p'],
    dangerousPatterns: [/rm\s+-/, /rmdir/, /^cd\s+\//],
    sandboxOnly: true
  },
  13: {
    world: 2,
    title: 'El Pergamino en Blanco',
    allowedCommands: ['touch', 'ls', 'help'],
    dangerousPatterns: [/rm\s+/, /rmdir/],
    sandboxOnly: true
  },
  14: {
    world: 2,
    title: 'La Ruta Perfecta',
    allowedCommands: ['mkdir', 'ls', 'help'],
    allowedFlags: ['-p'],
    dangerousPatterns: [/rm\s+-/],
    sandboxOnly: true
  },
  15: {
    world: 2,
    title: 'El Espejo de los Pergaminos',
    allowedCommands: ['cp', 'ls', 'help'],
    allowedFlags: ['-i', '-p'],
    dangerousPatterns: [/rm\s+/],
    sandboxOnly: true
  },
  16: {
    world: 2,
    title: 'El Ritual de Renombrar',
    allowedCommands: ['mv', 'ls', 'help'],
    allowedFlags: ['-i'],
    dangerousPatterns: [/rm\s+/],
    sandboxOnly: true
  },
  17: {
    world: 2,
    title: 'La Eliminación del Mal',
    allowedCommands: ['rm', 'ls', 'help'],
    allowedFlags: ['-i'],
    dangerousPatterns: [/rm\s+-r/, /rm\s+-f/, /rm\s+-rf/],
    sandboxOnly: true,
    warningMessage: 'Comando destructivo. Se ejecutará en sandbox.'
  },
  18: {
    world: 2,
    title: 'El Manual del Sabio',
    allowedCommands: ['man', 'help'],
    dangerousPatterns: []
  },
  19: {
    world: 2,
    title: 'La Búsqueda de Conocimiento',
    allowedCommands: ['apropos', 'man', 'help'],
    dangerousPatterns: []
  },
  20: {
    world: 2,
    title: 'La Variable Mística',
    allowedCommands: ['echo', 'help'],
    dangerousPatterns: []
  },
  21: {
    world: 2,
    title: 'El Glob del Caos',
    allowedCommands: ['ls', 'help'],
    allowedGlobbing: true,
    dangerousPatterns: []
  },

  // MUNDO 3: TORRES ANTIGUAS DEL PODER (Tema 3 - Power of CLI)
  22: {
    world: 3,
    title: 'El Primer Pergamino Comprimido',
    allowedCommands: ['tar', 'help'],
    allowedFlags: ['-cvf', '-czvf', '-cjvf'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  23: {
    world: 3,
    title: 'La Liberación del Pergamino',
    allowedCommands: ['tar', 'ls', 'help'],
    allowedFlags: ['-xvf', '-xzvf', '-xjvf'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  24: {
    world: 3,
    title: 'El Hechizo de la Compresión Doble',
    allowedCommands: ['tar', 'gzip', 'ls', 'help'],
    allowedFlags: ['-czvf', '-z'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  25: {
    world: 3,
    title: 'La Tubería Mística',
    allowedCommands: ['ls', 'grep', 'help'],
    allowedPipes: true,
    dangerousPatterns: [/\|\s*rm/, /\|\s*dd/, /\|\s*mkfs/],
    maxPipeDepth: 2
  },
  26: {
    world: 3,
    title: 'La Redirección al Infinito',
    allowedCommands: ['ls', 'echo', 'help'],
    allowedRedirection: ['>', '>>'],
    dangerousPatterns: [/>\s*\/dev\/sda/, />\s*\/etc/],
    sandboxOnly: true
  },
  27: {
    world: 3,
    title: 'La Bestia del Append',
    allowedCommands: ['echo', 'help'],
    allowedRedirection: ['>>'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  28: {
    world: 3,
    title: 'Los Espejos del Tee',
    allowedCommands: ['ls', 'tee', 'help'],
    allowedPipes: true,
    dangerousPatterns: [],
    sandboxOnly: true
  },
  29: {
    world: 3,
    title: 'El Cazador de Patrones',
    allowedCommands: ['grep', 'cat', 'help'],
    allowedFlags: ['-i', '-n', '-c', '-v', '-r'],
    maxRegexComplexity: 3,
    dangerousPatterns: []
  },
  30: {
    world: 3,
    title: 'Las Mil Búsquedas',
    allowedCommands: ['grep', 'find', 'help'],
    allowedFlags: ['-r', '-i', '-n'],
    dangerousPatterns: [/find\s+\/\s+/, /find.*-delete/],
    maxSearchScope: '.'
  },
  31: {
    world: 3,
    title: 'El Conjuro Insensible',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-i', '-n'],
    dangerousPatterns: []
  },
  32: {
    world: 3,
    title: 'La Inversión Sagrada',
    allowedCommands: ['grep', 'help'],
    allowedFlags: ['-v', '-n'],
    dangerousPatterns: []
  },
  33: {
    world: 3,
    title: 'Las Cabezas del Pergamino',
    allowedCommands: ['head', 'cat', 'help'],
    allowedFlags: ['-n'],
    dangerousPatterns: []
  },
  34: {
    world: 3,
    title: 'Las Colas Persistentes',
    allowedCommands: ['tail', 'help'],
    allowedFlags: ['-n', '-f'],
    dangerousPatterns: [],
    timeout: 5000
  },
  35: {
    world: 3,
    title: 'El Ordenador Místico',
    allowedCommands: ['sort', 'help'],
    allowedFlags: ['-n', '-r', '-u'],
    dangerousPatterns: []
  },
  36: {
    world: 3,
    title: 'Los Únicos Sobrevivientes',
    allowedCommands: ['sort', 'uniq', 'help'],
    allowedPipes: true,
    allowedFlags: ['-c', '-u'],
    dangerousPatterns: []
  },
  37: {
    world: 3,
    title: 'El Cuchillo Cortador',
    allowedCommands: ['cut', 'cat', 'help'],
    allowedFlags: ['-d', '-f', '-c'],
    dangerousPatterns: []
  },
  38: {
    world: 3,
    title: 'El Hechizo Sed',
    allowedCommands: ['sed', 'cat', 'help'],
    allowedFlags: ['-i', '-n', 'e'],
    maxSedComplexity: 2,
    dangerousPatterns: [/sed.*[^\\]\/.*\/.*\/$/],
    sandboxOnly: true
  },
  39: {
    world: 3,
    title: 'El Buscador Awk',
    allowedCommands: ['awk', 'help'],
    allowedFlags: ['-F'],
    maxAwkComplexity: 2,
    dangerousPatterns: [],
    sandboxOnly: true
  },
  40: {
    world: 3,
    title: 'Tu Primer Script Mágico',
    allowedCommands: ['echo', 'chmod', 'help', 'bash'],
    allowedFlags: ['+x'],
    sandboxOnly: true,
    scriptMode: true
  },

  // MUNDO 4: NÚCLEO DEL REINO (Tema 4 - OS & Hardware)
  41: {
    world: 4,
    title: 'El Conocedor del Núcleo',
    allowedCommands: ['uname', 'help'],
    allowedFlags: ['-r', '-a'],
    dangerousPatterns: []
  },
  42: {
    world: 4,
    title: 'El Inspector de CPU',
    allowedCommands: ['lscpu', 'help'],
    dangerousPatterns: []
  },
  43: {
    world: 4,
    title: 'La Memoria del Reino',
    allowedCommands: ['free', 'help'],
    allowedFlags: ['-h', '-m', '-g'],
    dangerousPatterns: []
  },
  44: {
    world: 4,
    title: 'Los Discos Eternos',
    allowedCommands: ['lsblk', 'help'],
    dangerousPatterns: []
  },
  45: {
    world: 4,
    title: 'El Espacio Disponible',
    allowedCommands: ['df', 'du', 'help'],
    allowedFlags: ['-h', '-s'],
    dangerousPatterns: []
  },
  46: {
    world: 4,
    title: 'Los Ríos USB',
    allowedCommands: ['lsusb', 'help'],
    dangerousPatterns: []
  },
  47: {
    world: 4,
    title: 'Los Procesos Vivos',
    allowedCommands: ['ps', 'help'],
    allowedFlags: ['aux', 'ef', '-u'],
    dangerousPatterns: []
  },
  48: {
    world: 4,
    title: 'El Top del Reino',
    allowedCommands: ['top', 'help'],
    timeout: 5000,
    dangerousPatterns: []
  },
  49: {
    world: 4,
    title: 'El Verdugo de Procesos',
    allowedCommands: ['kill', 'ps', 'help'],
    allowedFlags: ['-9'],
    dangerousPatterns: [/kill\s+-9\s+1/, /kill\s+-9\s+0/],
    warningMessage: 'Comando delicado. Solo en procesos específicos.'
  },
  50: {
    world: 4,
    title: 'El Diario del Reino',
    allowedCommands: ['journalctl', 'help'],
    allowedFlags: ['-n', '-f', '-u'],
    timeout: 5000,
    dangerousPatterns: []
  },
  51: {
    world: 4,
    title: 'El Mensaje del Kernel',
    allowedCommands: ['dmesg', 'tail', 'help'],
    allowedPipes: true,
    allowedFlags: ['-n'],
    dangerousPatterns: []
  },
  52: {
    world: 4,
    title: 'El Tiempo en el Reino',
    allowedCommands: ['uptime', 'help'],
    dangerousPatterns: []
  },
  53: {
    world: 4,
    title: 'El Camino de Red',
    allowedCommands: ['ip', 'help'],
    allowedSubcommands: ['addr', 'address', 'a'],
    dangerousPatterns: [/ip\s+addr\s+add/, /ip\s+addr\s+del/]
  },
  54: {
    world: 4,
    title: 'Las Rutas del Mensajero',
    allowedCommands: ['ip', 'route', 'help'],
    allowedSubcommands: ['route', 'r'],
    dangerousPatterns: [/ip\s+route\s+add/, /ip\s+route\s+del/]
  },
  55: {
    world: 4,
    title: 'El Eco del Cielo',
    allowedCommands: ['ping', 'help'],
    allowedFlags: ['-c', '-i', '-W'],
    maxPingCount: 10,
    timeout: 10000,
    dangerousPatterns: []
  },
  56: {
    world: 4,
    title: 'El DNS Mágico',
    allowedCommands: ['host', 'dig', 'nslookup', 'help'],
    dangerousPatterns: []
  },
  57: {
    world: 4,
    title: 'Los Puertos del Castillo',
    allowedCommands: ['ss', 'netstat', 'help'],
    allowedFlags: ['-tuln', '-t', '-u'],
    dangerousPatterns: []
  },
  58: {
    world: 4,
    title: 'La Conexión SSH',
    allowedCommands: ['ssh-keygen', 'help'],
    allowedFlags: ['-t', '-b', '-f'],
    sandboxOnly: true,
    warningMessage: 'Generará claves en sandbox.'
  },
  59: {
    world: 4,
    title: 'El Mensajero curl',
    allowedCommands: ['curl', 'help'],
    allowedFlags: ['-X', '-H', '-d', '-o'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    dangerousPatterns: [/curl.*localhost.*:3000/],
    timeout: 10000
  },

  // MUNDO 5: BÓVEDAS SECRETAS (Tema 5 - Security & Permissions)
  60: {
    world: 5,
    title: 'Tu Identidad en el Reino',
    allowedCommands: ['whoami', 'help'],
    dangerousPatterns: []
  },
  61: {
    world: 5,
    title: 'Los Detalles del Ser',
    allowedCommands: ['id', 'help'],
    dangerousPatterns: []
  },
  62: {
    world: 5,
    title: 'Los Ojos del Castillo',
    allowedCommands: ['who', 'help'],
    dangerousPatterns: []
  },
  63: {
    world: 5,
    title: 'El Trabajo del Pueblo',
    allowedCommands: ['w', 'help'],
    dangerousPatterns: []
  },
  64: {
    world: 5,
    title: 'El Libro de los Usuarios',
    allowedCommands: ['cat', 'grep', 'help'],
    restrictedPaths: ['/etc/passwd'],
    dangerousPatterns: [/cat\s+\/etc\/shadow/]
  },
  65: {
    world: 5,
    title: 'Crear un Aliado',
    allowedCommands: ['sudo', 'useradd', 'help'],
    allowedFlags: ['-m', '-s'],
    requiresSudo: true,
    sandboxOnly: true
  },
  66: {
    world: 5,
    title: 'La Llave del Aliado',
    allowedCommands: ['sudo', 'passwd', 'help'],
    requiresSudo: true,
    sandboxOnly: true,
    warningMessage: 'Cambiará contraseña. Solo en sandbox.'
  },
  67: {
    world: 5,
    title: 'El Grupo Sagrado',
    allowedCommands: ['sudo', 'groupadd', 'help'],
    requiresSudo: true,
    sandboxOnly: true
  },
  68: {
    world: 5,
    title: 'Unirse al Hermandad',
    allowedCommands: ['sudo', 'usermod', 'help'],
    allowedFlags: ['-aG'],
    requiresSudo: true,
    sandboxOnly: true
  },
  69: {
    world: 5,
    title: 'El Banquero del Reino',
    allowedCommands: ['cat', 'help'],
    restrictedPaths: ['/etc/group'],
    dangerousPatterns: []
  },
  70: {
    world: 5,
    title: 'Los Permisos Sagrados',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-la', '-l', '-lah'],
    dangerousPatterns: []
  },
  71: {
    world: 5,
    title: 'El Cambio de Permisos Numérico',
    allowedCommands: ['chmod', 'ls', 'help'],
    allowedFlags: ['+x', '-x', '755', '644', '700'],
    sandboxOnly: true,
    warningMessage: 'Modifica permisos. Solo en sandbox.'
  },
  72: {
    world: 5,
    title: 'El Cambio Simbólico',
    allowedCommands: ['chmod', 'ls', 'help'],
    allowedFlags: ['o-rwx', 'u+x', 'g-w'],
    sandboxOnly: true
  },
  73: {
    world: 5,
    title: 'La Propiedad Cambiada',
    allowedCommands: ['sudo', 'chown', 'help'],
    allowedFlags: ['-R'],
    requiresSudo: true,
    sandboxOnly: true
  },
  74: {
    world: 5,
    title: 'El SUID Mágico',
    allowedCommands: ['sudo', 'chmod', 'help'],
    allowedFlags: ['u+s'],
    requiresSudo: true,
    sandboxOnly: true,
    warningMessage: 'SUID es peligroso. Usar con cuidado.'
  },
  75: {
    world: 5,
    title: 'El Pegajoso de /tmp',
    allowedCommands: ['ls', 'help'],
    allowedFlags: ['-ld'],
    restrictedPaths: ['/tmp'],
    dangerousPatterns: []
  },
  76: {
    world: 5,
    title: 'El Enlace Duro',
    allowedCommands: ['ln', 'ls', 'help'],
    sandboxOnly: true
  },
  77: {
    world: 5,
    title: 'El Enlace Suave',
    allowedCommands: ['ln', 'ls', 'help'],
    allowedFlags: ['-s'],
    sandboxOnly: true
  },
  78: {
    world: 5,
    title: 'El Cambio de Identidad',
    allowedCommands: ['su', 'help'],
    allowedFlags: ['-', '-i'],
    warningMessage: 'Su es peligroso. Mejor usa sudo.'
  },
  79: {
    world: 5,
    title: 'Passwd: Cambiar Contraseña',
    allowedCommands: ['passwd', 'help'],
    dangerousPatterns: [/passwd\s+\/etc/],
    sandboxOnly: true
  },
  80: {
    world: 5,
    title: 'Useradd: Crear Usuarios',
    allowedCommands: ['useradd', 'help'],
    dangerousPatterns: [/useradd\s+(-u\s+0|-g\s+0)/],
    sandboxOnly: true
  },
  81: {
    world: 5,
    title: 'Groupadd: Crear Grupos',
    allowedCommands: ['groupadd', 'help'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  82: {
    world: 5,
    title: 'Usermod: Modificar Usuarios',
    allowedCommands: ['usermod', 'help'],
    dangerousPatterns: [/usermod.*-u\s+0/],
    sandboxOnly: true
  },
  83: {
    world: 5,
    title: 'Visudo: Configurar Sudo',
    allowedCommands: ['visudo', 'help'],
    dangerousPatterns: [],
    sandboxOnly: true,
    warningMessage: 'visudo es crítico para seguridad.'
  },
  84: {
    world: 5,
    title: 'Setuid y Setgid',
    allowedCommands: ['chmod', 'ls', 'help'],
    allowedFlags: ['-', 'R'],
    dangerousPatterns: [/chmod\s*4[0-9]{3}\s*\/bin/i, /chmod\s*2[0-9]{3}\s*\/sbin/i]
  },
  85: {
    world: 5,
    title: 'Sticky Bit',
    allowedCommands: ['chmod', 'help'],
    allowedFlags: ['-', 't', 'R'],
    dangerousPatterns: []
  },
  86: {
    world: 5,
    title: 'ACLs: Control de Acceso Extendido',
    allowedCommands: ['setfacl', 'getfacl', 'help'],
    allowedFlags: ['-', 'm', 'x', 'b'],
    dangerousPatterns: []
  },
  87: {
    world: 5,
    title: 'Archivos Especiales: /dev',
    allowedCommands: ['ls', 'cat', 'help'],
    allowedFlags: ['-', 'l', 'a'],
    dangerousPatterns: [/cat\s+\/dev\/(sda|sdb|mem|kmem)/]
  },
  88: {
    world: 5,
    title: 'Archivos de Configuración Sistema',
    allowedCommands: ['ls', 'cat', 'less', 'help'],
    allowedFlags: ['-', 'l', 'a', 'R'],
    dangerousPatterns: [/rm.*\/etc/, /mv.*\/etc/]
  },
  89: {
    world: 5,
    title: 'Logs del Sistema',
    allowedCommands: ['cat', 'tail', 'grep', 'less', 'help'],
    allowedFlags: ['-', 'f', 'n', 'i'],
    dangerousPatterns: [/rm.*\/var\/log/]
  },
  90: {
    world: 5,
    title: 'Firewall Básico: iptables',
    allowedCommands: ['iptables', 'help'],
    dangerousPatterns: [/iptables.*ACCEPT.*0\.0\.0\.0/],
    sandboxOnly: true,
    warningMessage: 'iptables es crítico. Sé cuidadoso.'
  },
  91: {
    world: 5,
    title: 'SSH y Criptografía',
    allowedCommands: ['ssh', 'ssh-keygen', 'help'],
    allowedFlags: ['-', 't', 'N', 'f', 'C'],
    dangerousPatterns: [/ssh\s+root@/]
  },
  92: {
    world: 5,
    title: 'Seguridad en Contraseñas',
    allowedCommands: ['passwd', 'help'],
    dangerousPatterns: [],
    warningMessage: 'Las contraseñas débiles comprometen seguridad.'
  },
  93: {
    world: 5,
    title: 'Auditoría: auditd',
    allowedCommands: ['auditctl', 'ausearch', 'help'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  94: {
    world: 5,
    title: 'SELinux: Control de Acceso Obligatorio',
    allowedCommands: ['semanage', 'help'],
    dangerousPatterns: [],
    sandboxOnly: true
  },
  95: {
    world: 5,
    title: 'Boss Final: Guardián Supremo',
    allowedCommands: ['chmod', 'chown', 'sudo', 'passwd', 'ssh', 'ls', 'pwd', 'echo', 'help'],
    allowedFlags: ['-', 'R', 'l', 'a'],
    dangerousPatterns: [/rm\s+(-r|-f|--recursive|--force)[\s\w\/.-]*(\/|\*|\.\.)/i],
    warningMessage: 'Boss final: domina TODO el conocimiento de seguridad.'
  }
};

/**
 * Obtiene comandos permitidos para una misión específica
 * @param {number} questId - ID de la misión
 * @returns {Object} Configuración de comandos permitidos
 */
export const getQuestCommandConfig = (questId) => {
  return QUEST_COMMANDS_MAP[questId] || {
    allowedCommands: ['help'],
    dangerousPatterns: [],
    sandboxOnly: false
  };
};

/**
 * Valida si un comando es permitido para una misión
 * @param {string} command - Comando a validar
 * @param {number} questId - ID de la misión
 * @returns {Object} { isAllowed, reason }
 */
export const validateCommandForQuest = (command, questId) => {
  const config = getQuestCommandConfig(questId);
  const baseCmd = command.trim().split(/\s+/)[0];

  if (!config.allowedCommands.includes(baseCmd)) {
    return {
      isAllowed: false,
      reason: `Este comando no está permitido en esta misión. Permitidos: ${config.allowedCommands.join(', ')}`
    };
  }

  // Verificar patrones peligrosos
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
