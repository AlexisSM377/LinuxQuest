export const ENEMIES = {
  // Mundo 3: Procesos - Enemigos
  zombie_process: {
    id: 'zombie_process',
    name: 'Proceso Zombie',
    world: 3,
    description: 'Un proceso muerto que aún camina entre los vivos',
    avatar: '🧟',
    hp: 50,
    difficulty: 1,
    weakness: ['ps aux | grep Z', 'ps -elf | grep Z'],
    defeatMessage: '¡Encontraste y eliminaste el proceso zombie!',
    questId: null // Se asigna en seed
  },
  runaway_daemon: {
    id: 'runaway_daemon',
    name: 'Demonio Descontrolado',
    world: 3,
    description: 'Un daemon que se lanzó sin control y consume recursos',
    avatar: '👹',
    hp: 75,
    difficulty: 2,
    weakness: ['top -b -n 1 | head -20', 'ps aux | grep "high_cpu"'],
    defeatMessage: '¡Identificaste y detuviste el daemon descontrolado!',
    questId: null
  },
  jefe_procesos: {
    id: 'jefe_procesos',
    name: 'Jefe de Procesos del Sistema',
    world: 3,
    description: 'El boss final de Mundo 3 - Controla todos los procesos peligrosos',
    avatar: '👹',
    hp: 150,
    difficulty: 4,
    isBoss: true,
    weakness: [
      'systemctl status',
      'ps aux | wc -l',
      'top -b -n 1',
      'ps -elf | grep root'
    ],
    defeatMessage: '¡VICTORIA! ¡Derrotaste al Jefe de Procesos! ¡Eres un maestro del sistema!',
    questId: null
  },

  // Mundo 5: Scripts - Enemigos
  syntax_error: {
    id: 'syntax_error',
    name: 'Error de Sintaxis',
    world: 5,
    description: 'Un error malvado que sabotea tus scripts',
    avatar: '❌',
    hp: 40,
    difficulty: 1,
    weakness: ['bash -x', 'shellcheck'],
    defeatMessage: '¡Encontraste y corregiste el error de sintaxis!',
    questId: null
  },
  infinite_loop: {
    id: 'infinite_loop',
    name: 'Bucle Infinito',
    world: 5,
    description: 'Un bucle que nunca termina, congelando tu sistema',
    avatar: '🔄',
    hp: 100,
    difficulty: 3,
    weakness: ['timeout 5', 'jobs', 'kill %1'],
    defeatMessage: '¡Detuviste el bucle infinito!',
    questId: null
  },
  dragon_final: {
    id: 'dragon_final',
    name: 'Dragón del Sistema - Señor de la Automatización',
    world: 5,
    description: 'El boss final - Domina todos los comandos y scripts',
    avatar: '🐉',
    hp: 200,
    difficulty: 5,
    isBoss: true,
    weakness: [
      'for i in {1..100}; do echo $i; done',
      'awk \'{print $1}\'',
      'sed \'s/old/new/g\'',
      'cron -l',
      'find . -type f -executable'
    ],
    defeatMessage: '¡¡¡VICTORIA ÉPICA!!! ¡¡Derrotaste al DRAGÓN FINAL!! ¡Eres el maestro absoluto de Linux!',
    questId: null
  }
};

export function getEnemyByQuest(questId) {
  return Object.values(ENEMIES).find(e => e.questId === questId);
}

export function getEnemiesbyWorld(worldId) {
  return Object.values(ENEMIES).filter(e => e.world === worldId);
}
