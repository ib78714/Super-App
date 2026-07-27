import React, { useState } from 'react';
import { Pill, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const PharmaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const medicines = [
    { name: 'Panadol Extra', active: 'Paracetamol + Caffeine', use: 'مسكن آلام ومخفف للحرارة والصداع', safePregnancy: false },
    { name: 'Cetafen', active: 'Paracetamol + Ibuprofen', use: 'مسكن وخافض حرارة ومضاد لالتهاب العظام', safePregnancy: false },
    { name: 'Augmentin 1g', active: 'Amoxicillin + Clavulanic Acid', use: 'مضاد حيوي واسع المجال لالتهابات الحلق والجهاز التنفسي', safePregnancy: true },
    { name: 'Congestal', active: 'Paracetamol + Pseudoephedrine', use: 'علاج أعراض البرد والاحتقان والعطس', safePregnancy: false },
    { name: 'Antinal', active: 'Nifuroxazide', use: 'مطهر معوي ومطهر لحالات الإسهال', safePregnancy: true },
  ];

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.active.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.use.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <div className="p-3 bg-teal-500/10 text-teal-600 rounded-2xl">
          <Pill className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">دليل الأدوية ودواعي الاستعمال</h1>
          <p className="text-sm text-slate-500">ابحث عن اسم الدواء لمعرفة المادة الفعالة ودواعي الاستخدام</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-3.5 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="ابحث باسم الدواء أو المادة الفعالة (مثلاً: Panadol, Antinal)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pr-12 pl-4 text-sm outline-none focus:border-teal-500 font-medium text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((med, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{med.name}</h3>
              <span className="text-xs font-mono bg-teal-500/10 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full font-bold">
                {med.active}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{med.use}</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center gap-1.5 text-slate-400">
              {med.safePregnancy ? (
                <span className="text-emerald-600 flex items-center gap-1 font-semibold"><CheckCircle2 size={14} /> آمن استخدامه بحذر أثناء الحمل (تحت إشراف طبي)</span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1 font-semibold"><ShieldAlert size={14} /> يتطلب استشارة طبيب خاصة للحوامل أو أصحاب الأمراض المزمنة</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};