import React from 'react';
import { useNews } from '../hooks/useNews';
import { useCars } from '../hooks/useCars';
import { 
  Car, 
  Banknote, 
  Coins, 
  Utensils, 
  Newspaper, 
  ShoppingBag,
  ArrowUpRight, 
  TrendingUp, 
  Flag,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { data: news, isLoading: isNewsLoading } = useNews();
  const { data: cars, isLoading: isCarsLoading } = useCars();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-8 text-white shadow-lg shadow-indigo-500/10">
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles size={14} /> منصتك الشاملة المتكاملة
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">أهلاً بك  👋</h1>
          <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
            ملخص مباشر وشامل لكافة أقسام التطبيق: استعراض المنتجات، أسعار السيارات، أسعار الصرف بالجنيه المصري، سوق الكريبتو، قائمة الوجبات، وأحدث الأخبار المصرية لحظة بلحظة.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid - 6 Main Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Amazon Store */}
        <Link to="/products" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">متجر المنتجات</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">متجر أمازون</span>
            <span className="text-xs text-indigo-500 font-semibold group-hover:underline flex items-center gap-0.5">
              تصفح <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        {/* Cars Gallery */}
        <Link to="/cars" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">معرض السيارات</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Car size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">{cars?.length || 6} موديلات</span>
            <span className="text-xs text-indigo-500 font-semibold group-hover:underline flex items-center gap-0.5">
              استكشف <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        {/* Currency EGP */}
        <Link to="/currencies" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">أسعار العملات</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Banknote size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">مقابل EGP</span>
            <span className="text-xs text-emerald-500 font-bold">تحديث حي</span>
          </div>
        </Link>

        {/* Crypto */}
        <Link to="/crypto" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">العملات الرقمية</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Coins size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">سوق الكريبتو</span>
            <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
              <TrendingUp size={14} /> أسعار مباشرة
            </span>
          </div>
        </Link>

        {/* Food & Meals */}
        <Link to="/food" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">الأطعمة والوجبات</span>
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Utensils size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">وصفات وأطباق</span>
            <span className="text-xs text-orange-500 font-semibold group-hover:underline flex items-center gap-0.5">
              عرض المنيو <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        {/* News Egypt */}
        <Link to="/news" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">أخبار مصر</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Newspaper size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">عاجل ومباشر</span>
            <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
              <Flag size={12} /> مصر
            </span>
          </div>
        </Link>

      </div>

      {/* Highlights Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* News Feed Widget */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 text-rose-600 rounded-xl">
                <Newspaper size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">عناوين الصحف المصرية اليوم</h2>
                <p className="text-xs text-slate-400">تحديث تلقائي لأحدث التطورات محلية</p>
              </div>
            </div>
            <Link to="/news" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              الصفحة الكاملة <ArrowUpRight size={14} />
            </Link>
          </div>

          {isNewsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="space-y-3">
              {news?.slice(0, 4).map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-4 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400">{new Date(item.pubDate).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Featured Cars Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl">
                <Car size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">أبرز السيارات M</h2>
            </div>
            <Link to="/cars" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              عرض الكل
            </Link>
          </div>

          {isCarsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="space-y-4">
              {cars?.slice(0, 3).map((car) => (
                <div key={car.id} className="flex items-center gap-3.5 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <img src={car.image} alt={car.model} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{car.make} {car.model}</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold mt-1">
                      {car.prices.EGP.toLocaleString()} ج.م
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};