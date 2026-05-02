export const ENEMIES = {
  // MUNDO 1: Enemigos del conocimiento
  distro_desconocida: {
    id: 'distro_desconocida',
    name: 'Distro Desconocida',
    world: 1,
    description: 'Una distribucion misteriosa que oculta su identidad',
    avatar: '\u2753',
    hp: 40,
    difficulty: 1,
    weakness: ['uname -a', 'cat /etc/os-release', 'which'],
    defeatMessage: 'Identificaste la distribucion! El conocimiento es poder.',
    questId: null
  },
  licencia_encriptada: {
    id: 'licencia_encriptada',
    name: 'Licencia Encriptada',
    world: 1,
    description: 'Una licencia cifrada que oculta sus condiciones',
    avatar: '\u{1F510}',
    hp: 60,
    difficulty: 2,
    weakness: ['cat /usr/share/doc/*/copyright', 'echo'],
    defeatMessage: 'Descifraste la licencia! El software libre prevalece.',
    questId: null
  },
  guardian_conocimiento: {
    id: 'guardian_conocimiento',
    name: 'Guardian del Conocimiento',
    world: 1,
    description: 'Boss del Mundo 1 - Protege los secretos de la historia Linux',
    avatar: '\u{1F3F0}',
    hp: 100,
    difficulty: 3,
    isBoss: true,
    weakness: ['uname -a', 'cat /etc/os-release', 'which', 'curl'],
    defeatMessage: 'VICTORIA! Derrotaste al Guardian del Conocimiento! El Mundo 2 te espera.',
    questId: 12
  },

  // MUNDO 2: Enemigos de archivos
  archivo_fantasma: {
    id: 'archivo_fantasma',
    name: 'Archivo Fantasma',
    world: 2,
    description: 'Un archivo oculto que se mueve entre directorios',
    avatar: '\u{1F47B}',
    hp: 50,
    difficulty: 1,
    weakness: ['ls -a', 'find', 'ls -la'],
    defeatMessage: 'Encontraste el archivo fantasma! La exploracion prevalece.',
    questId: null
  },
  directorio_ciclico: {
    id: 'directorio_ciclico',
    name: 'Directorio Ciclico',
    world: 2,
    description: 'Un laberinto de directorios que nunca termina',
    avatar: '\u{1F504}',
    hp: 75,
    difficulty: 2,
    weakness: ['pwd', 'cd ..', 'ls -la', 'find'],
    defeatMessage: 'Escapaste del laberinto! La navegacion es tu arma.',
    questId: null
  },
  guardian_caminos: {
    id: 'guardian_caminos',
    name: 'Guardian de los Caminos',
    world: 2,
    description: 'Boss del Mundo 2 - Domina la navegacion y archivos',
    avatar: '\u{1F6E4}\uFE0F',
    hp: 120,
    difficulty: 4,
    isBoss: true,
    weakness: ['ls -la', 'mkdir -p', 'cp -r', 'mv', 'rm', 'find'],
    defeatMessage: 'VICTORIA! Dominaste los caminos! Las Torres te esperan.',
    questId: 30
  },

  // MUNDO 3: Enemigos de procesamiento
  virus_textual: {
    id: 'virus_textual',
    name: 'Virus Textual',
    world: 3,
    description: 'Un patron malicioso que contamina archivos de texto',
    avatar: '\u{1F9A0}',
    hp: 60,
    difficulty: 2,
    weakness: ['grep -v', 'sed', 'awk'],
    defeatMessage: 'Purificaste el texto! El procesamiento es tu escudo.',
    questId: null
  },
  pipe_roto: {
    id: 'pipe_roto',
    name: 'Pipe Roto',
    world: 3,
    description: 'Una tuberia que desvia el flujo de datos',
    avatar: '\u{1F527}',
    hp: 80,
    difficulty: 3,
    weakness: ['ls | grep', 'cat | sort | uniq', 'echo | tee'],
    defeatMessage: 'Reparaste el pipe! El flujo de datos fluye libremente.',
    questId: null
  },
  pipemaster: {
    id: 'pipemaster',
    name: 'Mago Pipemaster',
    world: 3,
    description: 'Boss del Mundo 3 - Maestro del procesamiento de texto',
    avatar: '\u{1F9D9}\u200D\u2642\uFE0F',
    hp: 150,
    difficulty: 4,
    isBoss: true,
    weakness: ['grep -r', 'sed', 'awk', 'sort | uniq -c', 'cut'],
    defeatMessage: 'VICTORIA! Dominaste el arte del procesamiento! El Nucleo te espera.',
    questId: 48
  },

  // MUNDO 4: Enemigos de sistema
  proceso_zombie: {
    id: 'proceso_zombie',
    name: 'Proceso Zombie',
    world: 4,
    description: 'Un proceso muerto que aun camina entre los vivos',
    avatar: '\u{1F9DF}',
    hp: 50,
    difficulty: 1,
    weakness: ['ps aux | grep Z', 'kill -9', 'ps -elf'],
    defeatMessage: 'Eliminaste el zombie! El sistema esta mas limpio.',
    questId: null
  },
  demonio_descontrolado: {
    id: 'demonio_descontrolado',
    name: 'Demonio Descontrolado',
    world: 4,
    description: 'Un daemon que consume todos los recursos',
    avatar: '\u{1F479}',
    hp: 80,
    difficulty: 3,
    weakness: ['top -b -n 1', 'ps aux --sort=-%cpu', 'kill -9'],
    defeatMessage: 'Detuviste al demonio! Los recursos estan liberados.',
    questId: null
  },
  nucleo_roto: {
    id: 'nucleo_roto',
    name: 'El Nucleo Roto',
    world: 4,
    description: 'Boss del Mundo 4 - El corazon del sistema esta corrupto',
    avatar: '\u{1F494}',
    hp: 180,
    difficulty: 5,
    isBoss: true,
    weakness: ['dmesg | tail', 'free -h', 'df -h', 'ip addr', 'ping -c 4 127.0.0.1'],
    defeatMessage: 'VICTORIA! Salvaste el nucleo! Las Bovedas te esperan.',
    questId: 65
  },

  // MUNDO 5: Enemigos de seguridad
  permiso_invasor: {
    id: 'permiso_invasor',
    name: 'Permiso Invasor',
    world: 5,
    description: 'Un permiso incorrecto que compromete la seguridad',
    avatar: '\u26A0\uFE0F',
    hp: 60,
    difficulty: 2,
    weakness: ['chmod 755', 'chmod 644', 'ls -la', 'whoami && id'],
    defeatMessage: 'Corregiste los permisos! La seguridad esta restaurada.',
    questId: null
  },
  root_falso: {
    id: 'root_falso',
    name: 'Root Falso',
    world: 5,
    description: 'Un usuario que finge ser root para enganarte',
    avatar: '\u{1F3AD}',
    hp: 90,
    difficulty: 3,
    weakness: ['whoami', 'id', 'cat /etc/passwd'],
    defeatMessage: 'Expones al impostor! La identidad esta verificada.',
    questId: null
  },
  guardian_supremo: {
    id: 'guardian_supremo',
    name: 'Guardian Supremo',
    world: 5,
    description: 'Boss Final - El ultimo obstaculo antes de la certificacion',
    avatar: '\u{1F409}',
    hp: 200,
    difficulty: 5,
    isBoss: true,
    weakness: ['whoami && id', 'chmod 755', 'chown', 'ls -la /etc/passwd', 'ssh-keygen'],
    defeatMessage: 'VICTORIA EPICA! Derrotaste al Guardian Supremo! Eres un Maestro Linux!',
    questId: 80
  }
};

export function getEnemyByQuest(questId) {
  return Object.values(ENEMIES).find(e => e.questId === questId);
}

export function getEnemiesByWorld(worldId) {
  return Object.values(ENEMIES).filter(e => e.world === worldId);
}
