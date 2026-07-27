import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Smartphone } from 'lucide-react';
import {
  LayoutDashboard,
  ShoppingBag,
  Car,
  Bus,
  Coins,
  Bitcoin,
  Utensils,
  Newspaper,
  CloudSun,
  Calculator,
  Compass,
  Heart,
  CheckSquare,
  TrainFront,
  QrCode,
  Activity,
  Film,
  Briefcase,
  Trophy,
  Settings,
  X,
  // الأيقونات المعدلة هنا (بدل Gold استخدمنا Gem و Coins)
  Train,
  Pill,
  Palette,
  FileCode,
  Wifi,
  Gem
} from 'lucide-react';

const navGroups = [
  {
    title: 'البيانات والتسوق',
    links: [
      { to: '/', icon: LayoutDashboard, label: 'الرئيسية' },
      { to: '/products', icon: ShoppingBag, label: 'المنتجات' },
      { to: '/cars', icon: Car, label: 'السيارات' },
      { to: '/currencies', icon: Coins, label: 'العملات' },
      { to: '/crypto', icon: Bitcoin, label: 'الكريبتو' },
      { to: '/food', icon: Utensils, label: 'المأكولات' },
      { to: '/news', icon: Newspaper, label: 'الأخبار' },
      { to: '/tech', icon: Smartphone, label: 'أسعار الموبايلات واللابات' },
    ]
  },
  {
    title: 'الأدوات التفاعلية',
    links: [
      { to: '/weather', icon: CloudSun, label: 'الطقس' },
      { to: '/calculator', icon: Calculator, label: 'الحاسبة' },
      { to: '/prayer-times', icon: Compass, label: 'مواقيت الصلاة' },
      { to: '/wishlist', icon: Heart, label: 'المفضلة' },
      { to: '/todo', icon: CheckSquare, label: 'المهام (To-Do)' },
    ]
  },
  {
    title: 'الخدمات العامة والمواصلات',
    links: [
      { to: '/metro', icon: TrainFront, label: 'مترو الأنفاق' },
     { to: '/transit', icon: Bus, label: 'دليل المواصلات الحديثة' },
      { to: '/trains', icon: Train, label: 'القطارات' },
      { to: '/gold', icon: Gem, label: 'أسعار الذهب' },
      { to: '/pharma', icon: Pill, label: 'دليل الأدوية' },
      { to: '/health', icon: Activity, label: 'الصحة والرياضة' },
    ]
  },
  {
    title: 'الترفيه والوظائف',
    links: [
      { to: '/movies', icon: Film, label: 'الأفلام' },
      { to: '/jobs', icon: Briefcase, label: 'الوظائف' },
      { to: '/sports', icon: Trophy, label: 'المباريات' },
    ]
  },
  {
    title: 'أدوات المطوّرين والتقنية',
    links: [
      { to: '/qr-tools', icon: QrCode, label: 'أدوات QR' },
      { to: '/palette', icon: Palette, label: 'مُولد الألوان' },
      { to: '/markdown', icon: FileCode, label: 'محرر Markdown' },
      { to: '/speed', icon: Wifi, label: 'اختبار السرعة' },
    ]
  },
  {
    title: 'النظام',
    links: [
      { to: '/settings', icon: Settings, label: 'الإعدادات' },
    ]
  }
];

export const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppStore();

  const closeMenu = () => {
    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <>
      {/* Sidebar للشاشات الكبيرة */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 sticky top-0 h-screen shrink-0 overflow-y-auto">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-600/30">
            S
          </div>
          <div>
            <h2 className="font-black text-base text-slate-900 dark:text-white leading-tight">SuperApp</h2>
            <p className="text-[10px] text-slate-400 font-semibold">منصة الخدمات الذكية</p>
          </div>
        </div>

        <nav className="space-y-6 flex-1">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {group.title}
              </p>
              {group.links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navItemClass}>
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex">
          <div className="w-72 bg-white dark:bg-slate-900 h-full p-4 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
                  <span className="font-black text-sm">SuperApp</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-5">
                {navGroups.map((group, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="px-3 text-[10px] font-black uppercase text-slate-400">{group.title}</p>
                    {group.links.map((link) => (
                      <NavLink key={link.to} to={link.to} onClick={closeMenu} className={navItemClass}>
                        <link.icon size={18} />
                        <span>{link.label}</span>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1" onClick={closeMenu} />
        </div>
      )}
    </>
  );
};