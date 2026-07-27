import React, { useState } from 'react';
import { Activity, Scale, Droplet } from 'lucide-react';

export const HealthPage = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
  const waterNeeds = (weight * 0.035).toFixed(1);

  const getBmiCategory = (val) => {
    if (val < 18.5) return { text: 'نقص في الوزن', color: 'text-amber-500' };
    if (val < 25) return { text: 'وزن مثالي والصحة جيدة', color: 'text-emerald-500' };
    if (val < 30) return { text: 'زيادة طفيفة في الوزن', color: 'text-orange-500' };
    return { text: 'سمنة تجب متابعتها', color: 'text-rose-500' };
  };

  const status = getBmiCategory(bmi);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">حاسبة الصحة واللياقة</h1>
          <p className="text-sm text-slate-500">حساب كتلة الجسم (BMI) واحتياج الماء اليومي</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">الوزن: {weight} كجم</label>
            <input type="range" min="40" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">الطول: {height} سم</label>
            <input type="range" min="120" max="210" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Scale size={16} /> مؤشر كتلة الجسم (BMI)
            </div>
            <h2 className="text-4xl font-black font-mono mt-2 text-slate-900 dark:text-white">{bmi}</h2>
            <p className={`text-sm font-bold mt-1 ${status.color}`}>{status.text}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Droplet size={16} className="text-blue-500" /> احتِياج الماء اليومي:
            </span>
            <span className="font-mono font-bold text-blue-600">{waterNeeds} لتر / يوم</span>
          </div>
        </div>
      </div>
    </div>
  );
};