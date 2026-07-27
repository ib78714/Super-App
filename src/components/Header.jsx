import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="ابحث هنا..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="تبديل المظهر"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        </button>

        {/* Notifications Button */}
        <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
            IB
          </div>
          <div className="hidden sm:block text-right">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Ibrahim</h4>
            <span className="text-xs text-slate-400"></span>
          </div>
        </div>
      </div>
    </header>
  );
};