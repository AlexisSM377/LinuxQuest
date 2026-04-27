export const ACHIEVEMENTS = {
  primer_paso: {
    id: 'primer_paso',
    title: 'Primer Paso',
    description: 'Completa tu primera quest',
    icon: '🐣',
    xp_bonus: 50
  },
  mundo_1: {
    id: 'mundo_1',
    title: 'Explorador del Mundo 1',
    description: 'Completa todas las quests del Mundo 1',
    icon: '🌍',
    xp_bonus: 100
  },
  mundo_2: {
    id: 'mundo_2',
    title: 'Explorador del Mundo 2',
    description: 'Completa todas las quests del Mundo 2',
    icon: '🌎',
    xp_bonus: 100
  },
  mundo_3: {
    id: 'mundo_3',
    title: 'Explorador del Mundo 3',
    description: 'Completa todas las quests del Mundo 3',
    icon: '🌏',
    xp_bonus: 100
  },
  nivel_5: {
    id: 'nivel_5',
    title: 'Aprendiz',
    description: 'Alcanza nivel 5',
    icon: '⭐',
    xp_bonus: 75
  },
  nivel_10: {
    id: 'nivel_10',
    title: 'Veterano',
    description: 'Alcanza nivel 10',
    icon: '⭐⭐',
    xp_bonus: 150
  },
  nivel_20: {
    id: 'nivel_20',
    title: 'Maestro',
    description: 'Alcanza nivel máximo (20)',
    icon: '👑',
    xp_bonus: 500
  },
  velocista: {
    id: 'velocista',
    title: 'Velocista',
    description: 'Completa 5 quests en un día',
    icon: '⚡',
    xp_bonus: 80
  },
  coleccionista: {
    id: 'coleccionista',
    title: 'Coleccionista',
    description: 'Completa 50 quests',
    icon: '🎯',
    xp_bonus: 200
  },
  completista: {
    id: 'completista',
    title: 'Completista',
    description: 'Completa todas las 95 quests',
    icon: '🏆',
    xp_bonus: 1000
  },
  sin_errores: {
    id: 'sin_errores',
    title: 'Experto',
    description: 'Completa una quest sin intentos fallidos',
    icon: '✨',
    xp_bonus: 60
  },
  guerrero_persistente: {
    id: 'guerrero_persistente',
    title: 'Guerrero Persistente',
    description: 'Completa 100 quests',
    icon: '⚔️',
    xp_bonus: 250
  }
};

export const AchievementTypes = {
  FIRST_QUEST: 'primer_paso',
  WORLD_COMPLETE: 'mundo',
  LEVEL_REACHED: 'nivel',
  DAILY_QUESTS: 'velocista',
  QUEST_COUNT: 'count',
  ALL_QUESTS: 'completista'
};
