import React, { useState } from 'react';
import { QrCode, Download, Link2 } from 'lucide-react';

export const QrPage = () => {
  const [text, setText] = useState('https://github.com');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">مولد أكواد QR</h1>
          <p className="text-sm text-slate-500">حَوِّل أي رابط أو نص إلى كود استجابة سريع بضغطة زر</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-2">أدخل النص أو الرابط:</label>
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-semibold"
            />
            <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 space-y-4">
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-xl shadow-md bg-white p-2" />
          <a
            href={qrUrl}
            target="_blank"
            download="qrcode.png"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all"
          >
            <Download size={16} /> تحميل الصورة
          </a>
        </div>
      </div>
    </div>
  );
};