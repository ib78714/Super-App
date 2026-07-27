import React from 'react';
import { Sun, Moon, Bell, User } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
// ⏱️ كود الساعة
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const Navbar = () => {
  const { t, i18n } = useTranslation();

  // دالة تغيير اللغة اتجاه الصفحة
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    // تغيير اتجاه الصفحة (RTL للعربي و LTR للإنجليزي)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

export const Navbar = () => {
  const { isDarkMode, toggleTheme, isSidebarOpen } = useAppStore();

  return (
    <header 
      className={`fixed top-0 right-0 z-30 h-16 border-b transition-all duration-300
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-md 
      border-slate-200 dark:border-slate-800
      ${isSidebarOpen ? 'left-64' : 'left-20'}`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Side Info */}
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Dashboard Overview
        </h2>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="p-2 text-slate-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
            <Bell size={20} />
          </button>
            {/*  شكل الساعة */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <Clock size={16} className="text-amber-400 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-bold font-mono text-amber-300 dir-ltr">
                {formattedTime}
            </span>
            </div>

            <nav className="flex justify-between items-center p-4 bg-slate-900 text-white">
      {/* اسم الموقع مترجم */}
      <div className="font-bold text-lg">{t('services')}</div>

      <div className="flex items-center gap-4">
        {/* 🌐 زرار التبديل بين اللغات */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs transition-all border border-slate-700"
        >
          <Globe size={16} />
          <span>{i18n.language === 'ar' ? 'English' : 'عربي'}</span>
        </button>
      </div>
    </nav>
          {/* Profile Avatar Placeholder */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:inline">
              Ibrahim
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};