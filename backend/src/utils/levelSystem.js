// Sistema de niveles: 20 niveles con XP acumulativo progresivo
// 95 quests con ~75 XP promedio = ~7500 XP máximo

const XP_LEVELS = [
  0,      // Nivel 1: 0 XP
  100,    // Nivel 2: 100 XP acumulado
  300,    // Nivel 3: 300 XP acumulado
  600,    // Nivel 4: 600 XP acumulado
  1000,   // Nivel 5: 1000 XP acumulado
  1500,   // Nivel 6: 1500 XP acumulado
  2050,   // Nivel 7: 2050 XP acumulado
  2650,   // Nivel 8: 2650 XP acumulado
  3300,   // Nivel 9: 3300 XP acumulado
  4000,   // Nivel 10: 4000 XP acumulado
  4750,   // Nivel 11: 4750 XP acumulado
  5150,   // Nivel 12: 5150 XP acumulado
  5570,   // Nivel 13: 5570 XP acumulado
  6010,   // Nivel 14: 6010 XP acumulado
  6470,   // Nivel 15: 6470 XP acumulado
  6950,   // Nivel 16: 6950 XP acumulado
  7450,   // Nivel 17: 7450 XP acumulado
  7970,   // Nivel 18: 7970 XP acumulado
  8510,   // Nivel 19: 8510 XP acumulado
  9070    // Nivel 20: 9070 XP (máximo)
];

const MAX_LEVEL = 20;

export const calculateLevel = (totalXp) => {
  if (totalXp >= XP_LEVELS[MAX_LEVEL - 1]) return MAX_LEVEL;

  for (let i = MAX_LEVEL - 1; i >= 0; i--) {
    if (totalXp >= XP_LEVELS[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const getXpForNextLevel = (level) => {
  if (level >= MAX_LEVEL) return 0;
  const nextIndex = level;
  return nextIndex < XP_LEVELS.length ? XP_LEVELS[nextIndex] : 0;
};

export const getLevelProgress = (totalXp) => {
  const level = calculateLevel(totalXp);
  if (level === MAX_LEVEL) return 100;

  const currentLevelXp = XP_LEVELS[level - 1];
  const nextLevelXp = XP_LEVELS[level];
  const xpInLevel = totalXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;

  return Math.round((xpInLevel / xpNeeded) * 100);
};

export const getXpInCurrentLevel = (totalXp) => {
  const level = calculateLevel(totalXp);
  const currentLevelXp = XP_LEVELS[level - 1];
  return totalXp - currentLevelXp;
};

export const getXpToNextLevel = (totalXp) => {
  const level = calculateLevel(totalXp);
  if (level === MAX_LEVEL) return 0;
  return XP_LEVELS[level] - totalXp;
};

export default {
  XP_LEVELS,
  MAX_LEVEL,
  calculateLevel,
  getXpForNextLevel,
  getLevelProgress,
  getXpInCurrentLevel,
  getXpToNextLevel
};
