import { create } from 'zustand';

export const useGameStore = create((set) => ({
  currentQuestId: null,
  currentQuest: null,
  quests: [],
  userProgress: [],
  userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 },
  achievements: [],
  userAchievements: [],
  loading: true,

  setCurrentQuestId: (questId) => set({ currentQuestId: questId }),
  setCurrentQuest: (quest) => set({ currentQuest: quest }),
  setQuests: (quests) => set({ quests }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setUserStats: (stats) => set({ userStats: stats }),
  setAchievements: (achievements) => set({ achievements }),
  setUserAchievements: (userAchievements) => set({ userAchievements }),
  setLoading: (loading) => set({ loading }),

  fetchQuests: async () => {
    try {
      set({ loading: true });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quests`);
      const quests = await response.json();
      set({ quests });
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchQuestsByWorld: async (worldId) => {
    try {
      set({ loading: true });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quests/world/${worldId}`);
      const quests = await response.json();
      set({ quests });
    } catch (error) {
      console.error('Error fetching quests by world:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserProgress: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userProgress: [] });
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quests/user/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      set({ userProgress: data.progress || [] });
    } catch (error) {
      console.error('Error fetching user progress:', error);
      set({ userProgress: [] });
    }
  },

  fetchUserStats: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 } });
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quests/user/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const stats = await response.json();
      set({ userStats: stats });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      set({ userStats: { xp: 0, level: 1, coins: 0, xpToNext: 100, progress: 0 } });
    }
  },

  completeQuest: async (questId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quests/${questId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Failed to complete quest:', response.status);
        return null;
      }

      const data = await response.json();
      if (data.success) {
        set(state => ({
          userProgress: state.userProgress.map(p =>
            p.quest_id === questId ? { ...p, status: 'completed' } : p
          ),
          userStats: {
            xp: data.totalXp,
            level: data.newLevel,
            coins: state.userStats.coins + data.coinsGained,
            xpToNext: data.xpToNext,
            progress: data.progress || 0
          },
          userAchievements: state.userAchievements
        }));
      }
      return data;
    } catch (error) {
      console.error('Error completing quest:', error);
      return null;
    }
  },

  fetchAchievements: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/achievements`);
      const achievements = await response.json();
      set({ achievements });
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  },

  fetchUserAchievements: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ userAchievements: [] });
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/achievements/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userAchievements = await response.json();
      set({ userAchievements });
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      set({ userAchievements: [] });
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
  }
}));
