import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Sun, Moon, Loader2 } from 'lucide-react';

// قائمة الـ 27 محافظة كاملة باللغة الإنجليزية للـ API وباسم عربي للعرض
const EGYPT_GOVERNORATES = [
  { name: 'القاهرة', city: 'Cairo' },
  { name: 'الجيزة', city: 'Giza' },
  { name: 'الإسكندرية', city: 'Alexandria' },
  { name: 'القليوبية (بنها)', city: 'Banha' },
  { name: 'الشرقية (الزقازيق)', city: 'Zagazig' },
  { name: 'الدقهلية (المنصورة)', city: 'Mansoura' },
  { name: 'البحيرة (دمنهور)', city: 'Damanhur' },
  { name: 'المنوفية (شبين الكوم)', city: 'Shibin El Kom' },
  { name: 'الغربية (طنطا)', city: 'Tanta' },
  { name: 'دمياط', city: 'Damietta' },
  { name: 'كفر الشيخ', city: 'Kafr El Sheikh' },
  { name: 'بورسعيد', city: 'Port Said' },
  { name: 'الإسماعيلية', city: 'Ismailia' },
  { name: 'السويس', city: 'Suez' },
  { name: 'شمال سيناء (العريش)', city: 'Arish' },
  { name: 'جنوب سيناء (الطور)', city: 'El Tor' },
  { name: 'الفيوم', city: 'Faiyum' },
  { name: 'بني سويف', city: 'Beni Suef' },
  { name: 'المنيا', city: 'Minya' },
  { name: 'أسيوط', city: 'Asyut' },
  { name: 'سوهاج', city: 'Sohag' },
  { name: 'قنا', city: 'Qena' },
  { name: 'الأقصر', city: 'Luxor' },
  { name: 'أسوان', city: 'Aswan' },
  { name: 'البحر الأحمر (الغردقة)', city: 'Hurghada' },
  { name: 'الوادي الجديد (الخارجة)', city: 'El Kharga' },
  { name: 'مطروح (مرسى مطروح)', city: 'Mersa Matruh' },
];

export const PrayerPage = () => {
  const [timings, setTimings] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Cairo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // method=5 هو طريقة الحساب الخاصة بـ الهيئة المصرية العامة للمساحة
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Egypt&method=5`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.timings) {
          setTimings(data.data.timings);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching prayer times:", err);
        setLoading(false);
      });
  }, [selectedCity]);

  const prayers = [
    { name: 'الفجر', key: 'Fajr', icon: Moon },
    { name: 'الشروق', key: 'Sunrise', icon: Sun },
    { name: 'الظهر', key: 'Dhuhr', icon: Sun },
    { name: 'العصر', key: 'Asr', icon: Sun },
    { name: 'المغرب', key: 'Maghrib', icon: Moon },
    { name: 'العشاء', key: 'Isha', icon: Moon },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">مواقيت الصلاة في مصر</h1>
            <p className="text-sm text-slate-500">حسب الهيئة المصرية العامة للمساحة</p>
          </div>
        </div>

        {/* قائمة اختيار المحافظات الـ 27 */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <MapPin size={18} className="text-emerald-600 shrink-0 mr-1" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer pr-2"
          >
            {EGYPT_GOVERNORATES.map((gov) => (
              <option key={gov.city} value={gov.city} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {gov.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* مواقيت الصلاة */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm text-slate-500 font-medium">جاري تحضير مواقيت الصلاة...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {prayers.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.key}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3 hover:border-emerald-500/50 transition-all shadow-sm"
              >
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400">{p.name}</h4>
                  <p className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">
                    {timings ? timings[p.key] : '--:--'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};