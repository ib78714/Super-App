import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isDarkMode: false,
  isSidebarOpen: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isDarkMode: false,
  language: 'ar', // اللغة الافتراضية
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLanguage: (lang) => set({ language: lang }),
}));