import React, { useState, useEffect } from 'react';
import { Coins, RefreshCw, ShieldCheck, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export const GoldPricesPage = () => {
  // السعر الرئيسي المبدئي (عيار 21)
  const [mainPrice, setMainPrice] = useState(5985);
  const [priceChangeDirection, setPriceChangeDirection] = useState('none'); // 'up' | 'down' | 'none'
  const [lastUpdated, setLastUpdated] = useState('الآن');
  const [isUpdating, setIsUpdating] = useState(false);

  // حساب باقي العيارات تلقائياً بناءً على السعر الرئيسي (عيار 21)
  const karat24 = Math.round(mainPrice * (24 / 21));
  const karat18 = Math.round(mainPrice * (18 / 21));
  const goldPound = mainPrice * 8; // الجنيه الذهب = 8 جرام عيار 21

  // ⏱️ التأثير اللي بيغيّر السعر تلقائياً كل 3 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);

      // محاكاة التذبذب الطبيعي في البورصة (-5 إلى +5 جنيه)
      const change = Math.floor(Math.random() * 11) - 5; 
      
      setMainPrice((prevPrice) => {
        const newPrice = prevPrice + change;
        
        if (change > 0) setPriceChangeDirection('up');
        else if (change < 0) setPriceChangeDirection('down');
        else setPriceChangeDirection('none');

        return newPrice;
      });

      setLastUpdated(new Date().toLocaleTimeString('ar-EG'));

      // إخفاء مؤشر اللودينج السريع
      setTimeout(() => setIsUpdating(false), 500);

    }, 3000); // 3000 مللي ثانية = 3 ثواني

    // تنظيف الـ Interval عند الخروج من الصفحة لعدم استهلاك الذاكرة
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Coins size={28} className="text-amber-100" />
            </div>
            <h1 className="text-2xl font-black">أسعار الذهب اللحظية (تحديث آلي)</h1>
          </div>
          <p className="text-amber-100 text-xs sm:text-sm font-medium">
            يتم تحديث السعر تلقائياً كل 3 ثواني لمواكبة تذبذب السوق
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-2xl text-xs font-bold backdrop-blur-md self-start sm:self-auto">
          <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
          <span>تحديث تلقائي حي (3 ثواني)</span>
        </div>
      </div>

      {/* 🌟 السعر الرئيسي (عيار 21) مع مؤشر الصعود والهبوط */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300">
        <div className="flex items-center justify-between opacity-90 mb-2">
          <span className="text-sm font-bold">السعر الرئيسي (جرام عيار 21)</span>
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-black rounded-lg backdrop-blur-md">
            الأكثر تداولاً 🔥
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-4xl sm:text-5xl font-black tracking-tight">
            {mainPrice.toLocaleString()} <span className="text-xl font-bold">ج.م</span>
          </p>

          {/* مؤشر التغير */}
          {priceChangeDirection === 'up' && (
            <span className="flex items-center text-xs font-bold bg-emerald-400/30 text-emerald-100 px-2.5 py-1 rounded-full animate-bounce">
              <ArrowUpRight size={16} /> ارتفع
            </span>
          )}
          {priceChangeDirection === 'down' && (
            <span className="flex items-center text-xs font-bold bg-rose-500/30 text-rose-100 px-2.5 py-1 rounded-full animate-bounce">
              <ArrowDownRight size={16} /> انخفض
            </span>
          )}
        </div>

        <p className="text-xs opacity-80 mt-2 font-semibold">
          السعر المباشر بالجنيه المصري (بدون مصنعية)
        </p>
      </div>

      {/* باقى العيارات المرتبطة بالسعر الرئيسي */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* عيار 24 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">جرام عيار 24</span>
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-black rounded-md">الأعلى نقاءً</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {karat24.toLocaleString()} ج.م
          </p>
        </div>

        {/* عيار 18 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">جرام عيار 18</span>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black rounded-md">اقتصادي</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {karat18.toLocaleString()} ج.م
          </p>
        </div>

        {/* الجنيه الذهب */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">الجنيه الذهب</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black rounded-md">8 جرام (21)</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {goldPound.toLocaleString()} ج.م
          </p>
        </div>

      </div>

      {/* الفوتر مع أخر وقت للتحديث */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>تحديث ديناميكي متواصل شغال بدون إعادة تحمبل الصفحة</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} /> آخر تحديث: <strong className="text-slate-800 dark:text-slate-200">{lastUpdated}</strong>
        </div>
      </div>
    </div>
  );
};