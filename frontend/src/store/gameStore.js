import { create } from 'zustand';
import { apiFetch } from '../utils/api';
import { useToastStore } from './toastStore';

const API_URL = import.meta.env.VITE_API_URL;

const initialLoadingStates = {
  quests: false,
  userProgress: false,
  userStats: false,
  achievements: false,
  userAchievements: false,
  npcs: false,
  enemies: false,
  completingQuest: false
};

const showError = (msg) => {
  try { useToastStore.getState().error(msg); } catch {}
};

const showSuccess = (msg) => {
  try { useToastStore.getState().success(msg); } catch {}
};

async function extractError(response, fallback) {
  try {
    const body = await response.json();
    const msg = body.error || fallback;
    return `[${response.status}] ${msg}`;
  } catch {
    return `[${response.status}] ${fallback}`;
  }
}

export const useGameStore = create((set, get) => ({
  currentQuestId: null,
  currentQuest: null,
  quests: [],
  userProgress: [],
  userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 },
  achievements: [],
  userAchievements: [],
  npcs: [],
  enemies: [],
  loading: true,
  loadingStates: { ...initialLoadingStates },

  setCurrentQuestId: (questId) => set({ currentQuestId: questId }),
  setCurrentQuest: (quest) => set({ currentQuest: quest }),
  setQuests: (quests) => set({ quests }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setUserStats: (stats) => set({ userStats: stats }),
  setAchievements: (achievements) => set({ achievements }),
  setUserAchievements: (userAchievements) => set({ userAchievements }),
  setNPCs: (npcs) => set({ npcs }),
  setEnemies: (enemies) => set({ enemies }),
  setLoading: (loading) => set({ loading }),

  _setLoadingState: (key, value) => set(state => ({
    loadingStates: { ...state.loadingStates, [key]: value }
  })),

  fetchQuests: async () => {
    const setLoading = get()._setLoadingState;
    try {
      setLoading('quests', true);
      set({ loading: true });
      const response = await apiFetch(`${API_URL}/api/quests`);
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar misiones'));
        return;
      }
      const quests = await response.json();
      set({ quests });
    } catch (error) {
      console.error('Error fetching quests:', error);
      showError(error.message || 'Error al cargar misiones');
    } finally {
      setLoading('quests', false);
      set({ loading: false });
    }
  },

  fetchQuestsByWorld: async (worldId) => {
    const setLoading = get()._setLoadingState;
    try {
      setLoading('quests', true);
      set({ loading: true });
      const response = await apiFetch(`${API_URL}/api/quests/world/${worldId}`);
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar misiones del mundo'));
        return;
      }
      const quests = await response.json();
      set({ quests });
    } catch (error) {
      console.error('Error fetching quests by world:', error);
      showError(error.message || 'Error al cargar misiones del mundo');
    } finally {
      setLoading('quests', false);
      set({ loading: false });
    }
  },

  fetchUserProgress: async () => {
    const setLoading = get()._setLoadingState;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userProgress: [] });
        return;
      }
      setLoading('userProgress', true);
      const response = await apiFetch(`${API_URL}/api/quests/user/progress`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar progreso'));
        set({ userProgress: [] });
        return;
      }
      const data = await response.json();
      set({ userProgress: data.progress || [] });
    } catch (error) {
      console.error('Error fetching user progress:', error);
      showError(error.message || 'Error al cargar progreso');
      set({ userProgress: [] });
    } finally {
      setLoading('userProgress', false);
    }
  },

  fetchUserStats: async () => {
    const setLoading = get()._setLoadingState;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 } });
        return;
      }
      setLoading('userStats', true);
      const response = await apiFetch(`${API_URL}/api/quests/user/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar estadísticas'));
        set({ userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 } });
        return;
      }
      const stats = await response.json();
      set({ userStats: stats });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      showError(error.message || 'Error al cargar estadísticas');
      set({ userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 } });
    } finally {
      setLoading('userStats', false);
    }
  },

  completeQuest: async (questId) => {
    const setLoading = get()._setLoadingState;
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      setLoading('completingQuest', true);
      const response = await apiFetch(`${API_URL}/api/quests/${questId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        showError(await extractError(response, 'Error al completar misión'));
        return null;
      }

      const data = await response.json();
      if (data.success) {
        set(state => {
          const existingIdx = state.userProgress.findIndex(p => p.quest_id === questId);
          let newProgress;
          if (existingIdx >= 0) {
            newProgress = state.userProgress.map(p =>
              p.quest_id === questId ? { ...p, status: 'completed', completed_at: new Date().toISOString() } : p
            );
          } else {
            newProgress = [...state.userProgress, {
              quest_id: questId,
              status: 'completed',
              completed_at: new Date().toISOString(),
              attempts: 0,
            }];
          }

          return {
            userProgress: newProgress,
            userStats: {
              xp: data.totalXp,
              level: data.newLevel,
              coins: state.userStats.coins + data.coinsGained,
              xpToNext: data.xpToNext,
              progress: data.progressPercent || 0
            },
            userAchievements: state.userAchievements
          };
        });
        const bonusMsg = data.achievementBonusXp > 0 ? ` (+${data.achievementBonusXp} logro)` : '';
        showSuccess(`Misión completada (+${data.xpGained || 0} XP${bonusMsg})`);

        const BOSS_IDS = { 12: 2, 30: 3, 48: 4, 65: 5, 80: 6 };
        if (BOSS_IDS[questId]) {
          window.dispatchEvent(new CustomEvent('world:unlock', { detail: { world: BOSS_IDS[questId] } }));
        }
      }
      return data;
    } catch (error) {
      console.error('Error completing quest:', error);
      showError(error.message || 'Error al completar misión');
      return null;
    } finally {
      setLoading('completingQuest', false);
    }
  },

  fetchAchievements: async () => {
    const setLoading = get()._setLoadingState;
    try {
      setLoading('achievements', true);
      const response = await apiFetch(`${API_URL}/api/achievements`);
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar logros'));
        return;
      }
      const achievements = await response.json();
      set({ achievements });
    } catch (error) {
      console.error('Error fetching achievements:', error);
      showError(error.message || 'Error al cargar logros');
    } finally {
      setLoading('achievements', false);
    }
  },

  fetchUserAchievements: async () => {
    const setLoading = get()._setLoadingState;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userAchievements: [] });
        return;
      }
      setLoading('userAchievements', true);
      const response = await apiFetch(`${API_URL}/api/achievements/mine`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar tus logros'));
        set({ userAchievements: [] });
        return;
      }
      const userAchievements = await response.json();
      set({ userAchievements });
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      showError(error.message || 'Error al cargar tus logros');
      set({ userAchievements: [] });
    } finally {
      setLoading('userAchievements', false);
    }
  },

  checkQuestUnlocked: (quest, userProgress) => {
    if (!quest.prerequisites || quest.prerequisites.length === 0) {
      return true;
    }
    const completedQuestIds = userProgress
      .filter(p => p.status === 'completed')
      .map(p => p.quest_id);
    return quest.prerequisites.every(prereqId => completedQuestIds.includes(prereqId));
  },

  fetchNPCs: async () => {
    const setLoading = get()._setLoadingState;
    try {
      setLoading('npcs', true);
      const response = await apiFetch(`${API_URL}/api/npcs`);
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar NPCs'));
        return;
      }
      const npcs = await response.json();
      set({ npcs });
    } catch (error) {
      console.error('Error fetching NPCs:', error);
      showError(error.message || 'Error al cargar NPCs');
    } finally {
      setLoading('npcs', false);
    }
  },

  fetchEnemies: async () => {
    const setLoading = get()._setLoadingState;
    try {
      setLoading('enemies', true);
      const response = await apiFetch(`${API_URL}/api/enemies`);
      if (!response.ok) {
        showError(await extractError(response, 'Error al cargar enemigos'));
        return;
      }
      const enemies = await response.json();
      set({ enemies });
    } catch (error) {
      console.error('Error fetching enemies:', error);
      showError(error.message || 'Error al cargar enemigos');
    } finally {
      setLoading('enemies', false);
    }
  }
}));
