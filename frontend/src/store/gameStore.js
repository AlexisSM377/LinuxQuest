import { create } from 'zustand';

export const useGameStore = create((set) => ({
  currentQuestId: null,
  currentQuest: null,
  quests: [],
  userProgress: [],
  loading: true,

  setCurrentQuestId: (questId) => set({ currentQuestId: questId }),
  setCurrentQuest: (quest) => set({ currentQuest: quest }),
  setQuests: (quests) => set({ quests }),
  setUserProgress: (progress) => set({ userProgress: progress }),
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
  }
}));
