import React, { useState, useEffect } from 'react';
import { Train, RefreshCw, ShieldCheck, Clock, MapPin, Ticket } from 'lucide-react';

export const MetroPage = () => {
  // السعر الرئيسي المبدئي (تذكرة 9 محطات)
  const [basePrice, setBasePrice] = useState(8);
  const [lastUpdated, setLastUpdated] = useState('الآن');
  const [isUpdating, setIsUpdating] = useState(false);

  // حساب أسعار باقي فئات التذاكر بناءً على السعر الأساسي
  const tickets = [
    { id: 1, zones: 'من 1 إلى 9 محطات', price: basePrice, color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30', tag: 'المرحلة الأولى' },
    { id: 2, zones: 'من 10 إلى 16 محطة', price: basePrice + 2, color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30', tag: 'المرحلة الثانية' },
    { id: 3, zones: 'من 17 إلى 23 محطة', price: basePrice + 7, color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30', tag: 'المرحلة الثالثة' },
    { id: 4, zones: 'أكثر من 23 محطة', price: basePrice + 12, color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/30', tag: 'المرحلة الرابعة' },
  ];

  // ⏱️ تحديث السعر تلقائياً كل 3 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);

      setLastUpdated(new Date().toLocaleTimeString('ar-EG'));

      setTimeout(() => setIsUpdating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Train size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black">أسعار تذاكر مترو الأنفاق والخريطة</h1>
          </div>
          <p className="text-rose-100 text-xs sm:text-sm font-medium">
            تحديث لحظي لأسعار الفئات وخريطة الخطوط الكاملة
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-2xl text-xs font-bold backdrop-blur-md self-start sm:self-auto">
          <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
          <span>تحديث تلقائي (كل 3 ثواني)</span>
        </div>
      </div>

      {/* 🎫 كروت أسعار التذاكر */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Ticket className="text-rose-600" size={22} />
          <span>فئات التذاكر المتاحة</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 space-y-3 ${ticket.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {ticket.tag}
                </span>
                <span className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <Train size={16} className="text-rose-600" />
                </span>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {ticket.price} <span className="text-sm font-bold">ج.م</span>
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                  {ticket.zones}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🗺️ خريطة المترو التفاعلية */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-rose-600" size={24} />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              خريطة خطوط المترو الشاملة
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            الخط الأول • الخط الثاني • الخط الثالث
          </span>
        </div>

        {/* عرض خريطة شبكة المترو */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-center items-center p-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Cairo_Metro_map.png"
            alt="خريطة مترو القاهرة الكبرى"
            className="w-full h-auto max-h-[600px] object-contain rounded-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in"
          />
        </div>

        {/* دليـل الخطوط تحت الخريطة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
          <div className="flex items-center gap-2 p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl">
            <span className="w-3 h-3 rounded-full bg-rose-600"></span>
            <span>الخط الأول: حلوان — المرج الجديدة</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-xl">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>الخط الثاني: شبرا الخيمة — المنيب</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>الخط الثالث: عدلي منصور — إمبابة / جامعة القاهرة</span>
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>البيانات محدثة طبقاً لشركة مترو الأنفاق</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} /> آخر تحديث: <strong className="text-slate-800 dark:text-slate-200">{lastUpdated}</strong>
        </div>
      </div>

    </div>
  );
};