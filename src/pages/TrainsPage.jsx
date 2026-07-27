import React, { useState } from 'react';
import { Train, Search, Clock, MapPin, ArrowRight, Banknote, AlertCircle } from 'lucide-react';

// قائمة المحطات الرئيسية والفرعية
const stations = [
  "القاهرة (محطة مصر)", "الإسكندرية", "سيدي جابر", "طنطا", "بنها", 
  "الزقازيق", "المنصورة", "الإسماعيلية", "بورسعيد", "السويس", 
  "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", 
  "الأقصر", "أسوان", "دمنهور", "كفر الشيخ", "الفيوم"
];

// داتا جدول الرحلات المجهزة (Mock Data مطابقة لدرجات وسرعات القطارات الواقعية)
const allTrainsData = [
  { id: '905', type: 'تليجو (VIP)', from: 'القاهرة (محطة مصر)', to: 'الإسكندرية', departure: '08:00 ص', arrival: '10:30 ص', duration: '2.5 ساعة', priceFirst: 225, priceSecond: 150, stops: ['بنها', 'طنطا', 'سيدي جابر'] },
  { id: '911', type: 'مكافأ مكيف', from: 'القاهرة (محطة مصر)', to: 'الإسكندرية', departure: '10:00 ص', arrival: '12:45 م', duration: '2.75 ساعة', priceFirst: 140, priceSecond: 95, stops: ['بنها', 'طنطا', 'دمنهور', 'سيدي جابر'] },
  { id: '980', type: 'VIP خاص', from: 'القاهرة (محطة مصر)', to: 'أسوان', departure: '08:00 ص', arrival: '10:25 م', duration: '14.4 ساعة', priceFirst: 380, priceSecond: 245, stops: ['بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 'الأقصر'] },
  { id: '2006', type: 'تليجو إسباني', from: 'القاهرة (محطة مصر)', to: 'الأقصر', departure: '05:15 م', arrival: '03:45 ص', duration: '10.5 ساعة', priceFirst: 320, priceSecond: 210, stops: ['المنيا', 'أسيوط', 'سوهاج', 'قنا'] },
  { id: '965', type: 'محسن / تهوية', from: 'القاهرة (محطة مصر)', to: 'المنصورة', departure: '07:15 ص', arrival: '09:30 ص', duration: '2.25 ساعة', priceFirst: 65, priceSecond: 45, stops: ['بنها', 'الزقازيق'] },
  { id: '88', type: 'مكيف روسي', from: 'الإسكندرية', to: 'أسوان', departure: '05:00 م', arrival: '10:30 ص', duration: '17.5 ساعة', priceFirst: 420, priceSecond: 290, stops: ['سيدي جابر', 'القاهرة', 'أسيوط', 'الأقصر'] },
  { id: '915', type: 'إسباني مكيف', from: 'القاهرة (محطة مصر)', to: 'الإسكندرية', departure: '03:10 م', arrival: '06:15 م', duration: '3 ساعات', priceFirst: 150, priceSecond: 110, stops: ['بنها', 'طنطا', 'دمنهور'] },
];

export const TrainsPage = () => {
  const [fromStation, setFromStation] = useState('القاهرة (محطة مصر)');
  const [toStation, setToStation] = useState('الإسكندرية');
  const [searchResults, setSearchResults] = useState(allTrainsData);

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromStation === toStation) {
      alert("يرجى اختيار محطة وصول مختلفة عن محطة القيام!");
      return;
    }
    const filtered = allTrainsData.filter(
      train => train.from === fromStation && train.to === toStation
    );
    setSearchResults(filtered);
  };

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <Train size={28} className="text-blue-200" />
            </div>
            <h1 className="text-2xl font-black">مواعيد وأسعار القطارات</h1>
          </div>
          <p className="text-blue-100 text-xs sm:text-sm font-medium">
            استعلم عن مواعيد الرحلات وأسعار التذاكر بين مختلف محطات سكة حديد مصر
          </p>
        </div>
      </div>

      {/* تنبيه مصداقية البيانات */}
      <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-semibold">
        <AlertCircle size={16} className="shrink-0" />
        <span>ملاحظة: البيانات المعروضة استرشادية لجدول رحلات السكك الحديدية. يُنصح بمراجعة شباك التذاكر للمواعيد الحالية.</span>
      </div>

      {/* نموذج البحث */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-3 items-end">
          
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin size={14} className="text-indigo-500" /> محطة القيام
            </label>
            <select
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {stations.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 flex justify-center pb-1">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-xl bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
              title="تبديل الاتجاه"
            >
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </button>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-500" /> محطة الوصول
            </label>
            <select
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {stations.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-7 mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Search size={16} /> بحث عن الرحلات
            </button>
          </div>

        </form>
      </div>

      {/* نتئاج البحث */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-300">
          الرحلات المتاحة ({searchResults.length})
        </h2>

        {searchResults.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <Train size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">لا توجد رحلات مباشرة مسجلة بين هذه المحطات حالياً</p>
            <p className="text-xs text-slate-400">جرّب تغيير محطة القيام أو الوصول لمدن رئيسية مثل (القاهرة - الإسكندرية - أسوان)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((train) => (
              <div 
                key={train.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-black">
                      قطار رقم {train.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      الدرجة: {train.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <Clock size={14} /> زمن الرحلة: {train.duration}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center items-center">
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold">مغادرة</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{train.departure}</p>
                    <p className="text-xs text-slate-500 font-semibold">{train.from}</p>
                  </div>

                  <div className="hidden sm:flex flex-col items-center">
                    <div className="w-full border-t-2 border-dashed border-slate-300 dark:border-slate-700 relative my-2">
                      <Train size={16} className="absolute left-1/2 -top-2.5 -translate-x-1/2 text-indigo-500 bg-white dark:bg-slate-900 px-1" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400 font-bold">وصول</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{train.arrival}</p>
                    <p className="text-xs text-slate-500 font-semibold">{train.to}</p>
                  </div>
                </div>

                {/* الأسعار والمحطات */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">أهم التوقفات:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{train.stops.join(" • ")}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 font-medium">أولى: </span>
                      <span className="font-black text-indigo-600 dark:text-indigo-400">{train.priceFirst} ج.م</span>
                    </div>
                    <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 font-medium">ثانية: </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">{train.priceSecond} ج.م</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};