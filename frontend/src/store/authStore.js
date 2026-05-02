import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.removeItem('lq-intro-shown');
    localStorage.removeItem('lq-tutorial-done');
    set({ user: userData, token, isAuthenticated: true });
  },

  register: (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.removeItem('lq-intro-shown');
    localStorage.removeItem('lq-tutorial-done');
    set({ user: userData, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('lq-intro-shown');
    localStorage.removeItem('lq-tutorial-done');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (userData) => {
    set({ user: userData });
  },

  getToken: () => {
    return get().token || localStorage.getItem('token');
  },

  validateToken: async () => {
    const token = get().token || localStorage.getItem('token');
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false });
      return false;
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
        return false;
      }
      const user = await res.json();
      set({ user, isAuthenticated: true });
      return true;
    } catch {
      return false;
    }
  }
}));
