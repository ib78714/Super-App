import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Moon, Sun } from 'lucide-react';

export const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">الإعدادات</h1>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="text-indigo-400" /> : <Sun className="text-amber-500" />}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">المظهر (Dark Mode)</h3>
              <p className="text-xs text-slate-500">التبديل بين الوضع الليلى والوضاء</p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isDarkMode 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-200 text-slate-800'
            }`}
          >
            {isDarkMode ? 'مُفعل 🌙' : 'معطل ☀️'}
          </button>
        </div>
      </div>
    </div>
  );
};