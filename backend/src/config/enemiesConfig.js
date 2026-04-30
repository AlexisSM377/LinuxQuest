export const ENEMIES = {
  // MUNDO 1: Enemigos de conocimiento
  distro_desconocida: {
    id: 'distro_desconocida',
    name: 'Distro Desconocida',
    world: 1,
    description: 'Una distribución misteriosa que oculta su identidad',
    avatar: '❓',
    hp: 40,
    difficulty: 1,
    weakness: ['uname -a', 'cat /etc/os-release', 'lsb_release -a'],
    defeatMessage: '¡Identificaste la distribución! El conocimiento es poder.',
    questId: null
  },
  licencia_encriptada: {
    id: 'licencia_encriptada',
    name: 'Licencia Encriptada',
    world: 1,
    description: 'Una licencia cifrada que oculta sus condiciones',
    avatar: '🔐',
    hp: 60,
    difficulty: 2,
    weakness: ['gpg --version', 'ls /usr/share/doc/', 'cat /usr/share/doc/*/copyright'],
    defeatMessage: '¡Descifraste la licencia! El software libre prevalece.',
    questId: null
  },
  guardian_conocimiento: {
    id: 'guardian_conocimiento',
    name: 'Guardián del Conocimiento',
    world: 1,
    description: 'Boss del Mundo 1 - Protege los secretos de la historia Linux',
    avatar: '🏰',
    hp: 100,
    difficulty: 3,
    isBoss: true,
    weakness: ['uname -a', 'cat /etc/os-release', 'which apt || which dnf', 'curl -s https://api.github.com/zen'],
    defeatMessage: '¡VICTORIA! ¡Derrotaste al Guardián del Conocimiento! El Mundo 2 te espera.',
    questId: null
  },

  // MUNDO 2: Enemigos de archivos
  archivo_fantasma: {
    id: 'archivo_fantasma',
    name: 'Archivo Fantasma',
    world: 2,
    description: 'Un archivo oculto que se mueve entre directorios',
    avatar: '👻',
    hp: 50,
    difficulty: 1,
    weakness: ['ls -a', 'find . -name "*"', 'ls -la'],
    defeatMessage: '¡Encontraste el archivo fantasma! La exploración prevalece.',
    questId: null
  },
  directorio_ciclico: {
    id: 'directorio_ciclico',
    name: 'Directorio Cíclico',
    world: 2,
    description: 'Un laberinto de directorios que nunca termina',
    avatar: '🔄',
    hp: 75,
    difficulty: 2,
    weakness: ['pwd', 'cd ..', 'ls -la', 'find . -maxdepth 3'],
    defeatMessage: '¡Escapaste del laberinto! La navegación es tu arma.',
    questId: null
  },
  guardian_caminos: {
    id: 'guardian_caminos',
    name: 'Guardián de los Caminos',
    world: 2,
    description: 'Boss del Mundo 2 - Domina la navegación y archivos',
    avatar: '🛤️',
    hp: 120,
    difficulty: 4,
    isBoss: true,
    weakness: ['ls -la', 'mkdir -p', 'cp -r', 'mv', 'rm', 'find'],
    defeatMessage: '¡VICTORIA! ¡Dominaste los caminos! Las Torres te esperan.',
    questId: null
  },

  // MUNDO 3: Enemigos de procesamiento
  virus_textual: {
    id: 'virus_textual',
    name: 'Virus Textual',
    world: 3,
    description: 'Un patrón malicioso que contamina archivos de texto',
    avatar: '🦠',
    hp: 60,
    difficulty: 2,
    weakness: ['grep -v "malicious"', 'sed "s/malicious//g"', 'awk "{print}"'],
    defeatMessage: '¡Purificaste el texto! El procesamiento es tu escudo.',
    questId: null
  },
  pipe_roto: {
    id: 'pipe_roto',
    name: 'Pipe Roto',
    world: 3,
    description: 'Una tubería que desvía el flujo de datos',
    avatar: '🔧',
    hp: 80,
    difficulty: 3,
    weakness: ['ls | grep', 'cat | sort | uniq', 'echo | tee'],
    defeatMessage: '¡Reparaste el pipe! El flujo de datos fluye libremente.',
    questId: null
  },
  pipemaster: {
    id: 'pipemaster',
    name: 'Mago Pipemaster',
    world: 3,
    description: 'Boss del Mundo 3 - Maestro del procesamiento de texto',
    avatar: '🧙‍♂️',
    hp: 150,
    difficulty: 4,
    isBoss: true,
    weakness: ['grep -r', 'sed "s/old/new/g"', 'awk "{print $1}"', 'sort | uniq -c', 'cut -d, -f1'],
    defeatMessage: '¡VICTORIA! ¡Dominaste el arte del procesamiento! El Núcleo te espera.',
    questId: null
  },

  // MUNDO 4: Enemigos de sistema
  proceso_zombie: {
    id: 'proceso_zombie',
    name: 'Proceso Zombie',
    world: 4,
    description: 'Un proceso muerto que aún camina entre los vivos',
    avatar: '🧟',
    hp: 50,
    difficulty: 1,
    weakness: ['ps aux | grep Z', 'kill -9', 'ps -elf'],
    defeatMessage: '¡Eliminaste el zombie! El sistema está más limpio.',
    questId: null
  },
  demonio_descontrolado: {
    id: 'demonio_descontrolado',
    name: 'Demonio Descontrolado',
    world: 4,
    description: 'Un daemon que consume todos los recursos',
    avatar: '👹',
    hp: 80,
    difficulty: 3,
    weakness: ['top -b -n 1', 'ps aux --sort=-%cpu', 'kill -9'],
    defeatMessage: '¡Detuviste al demonio! Los recursos están liberados.',
    questId: null
  },
  nucleo_roto: {
    id: 'nucleo_roto',
    name: 'El Núcleo Roto',
    world: 4,
    description: 'Boss del Mundo 4 - El corazón del sistema está corrupto',
    avatar: '💔',
    hp: 180,
    difficulty: 5,
    isBoss: true,
    weakness: ['dmesg | tail', 'free -h', 'df -h', 'ip addr', 'ping -c 4 127.0.0.1'],
    defeatMessage: '¡VICTORIA! ¡Salvaste el núcleo! Las Bóvedas Secretas te esperan.',
    questId: null
  },

  // MUNDO 5: Enemigos de seguridad
  permiso_invasor: {
    id: 'permiso_invasor',
    name: 'Permiso Invasor',
    world: 5,
    description: 'Un permiso incorrecto que compromete la seguridad',
    avatar: '⚠️',
    hp: 60,
    difficulty: 2,
    weakness: ['chmod 755', 'chmod 644', 'ls -la', 'whoami && id'],
    defeatMessage: '¡Corregiste los permisos! La seguridad está restaurada.',
    questId: null
  },
  root_falso: {
    id: 'root_falso',
    name: 'Root Falso',
    world: 5,
    description: 'Un usuario que finge ser root para engañarte',
    avatar: '🎭',
    hp: 90,
    difficulty: 3,
    weakness: ['whoami', 'id', 'sudo -l', 'cat /etc/passwd'],
    defeatMessage: '¡Expones al impostor! La identidad está verificada.',
    questId: null
  },
  guardian_supremo: {
    id: 'guardian_supremo',
    name: 'Guardián Supremo',
    world: 5,
    description: 'Boss Final - El último obstáculo antes de la certificación',
    avatar: '🐉',
    hp: 200,
    difficulty: 5,
    isBoss: true,
    weakness: ['whoami && id', 'chmod 755', 'chown', 'ls -la /etc/passwd', 'ssh-keygen -t rsa'],
    defeatMessage: '¡¡¡VICTORIA ÉPICA!!! ¡¡Derrotaste al Guardián Supremo!! ¡Eres un Maestro Linux!',
    questId: null
  }
};

export function getEnemyByQuest(questId) {
  return Object.values(ENEMIES).find(e => e.questId === questId);
}

export function getEnemiesByWorld(worldId) {
  return Object.values(ENEMIES).filter(e => e.world === worldId);
}
