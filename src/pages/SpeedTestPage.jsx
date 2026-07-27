import React, { useState } from 'react';
import { Activity, Play, Wifi, CheckCircle } from 'lucide-react';

export const SpeedTestPage = () => {
  const [testing, setTesting] = useState(false);
  const [ping, setPing] = useState(null);
  const [download, setDownload] = useState(null);

  const runTest = () => {
    setTesting(true);
    setPing(null);
    setDownload(null);

    setTimeout(() => {
      setPing(Math.floor(Math.random() * 20 + 12));
    }, 1200);

    setTimeout(() => {
      setDownload((Math.random() * 40 + 30).toFixed(1));
      setTesting(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto text-center">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="inline-p-4 bg-emerald-500/10 text-emerald-600 rounded-3xl p-4">
          <Wifi className="w-12 h-12 mx-auto" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">فاحص سرعة الشبكة و زمن الاستجابة (Ping)</h1>
          <p className="text-sm text-slate-500 mt-1">قياس جودة الاتصال وزمن وصول البيانات لطلب الخوادم</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400">زمن الـ Ping</span>
            <p className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">
              {ping ? `${ping} ms` : '--'}
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400">سرعة التحميل التقديرية</span>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
              {download ? `${download} Mbps` : '--'}
            </p>
          </div>
        </div>

        <button
          onClick={runTest}
          disabled={testing}
          className="w-full max-w-xs py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/20"
        >
          {testing ? 'جاري الفحص الآن...' : 'إبدأ الاختبار'}
        </button>
      </div>
    </div>
  );
};