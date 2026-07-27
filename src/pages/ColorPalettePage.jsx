import React, { useState } from 'react';
import { Palette, Copy, Check, Image as ImageIcon } from 'lucide-react';

export const ColorPalettePage = () => {
  const [colors, setColors] = useState(['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateRandomPalette = () => {
    const newColors = Array.from({ length: 5 }, () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    setColors(newColors);
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-500/10 text-violet-600 rounded-2xl">
            <Palette className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">مُولد ومستخرج الألوان (Color Palette)</h1>
            <p className="text-sm text-slate-500">توليد لوحات ألوان متناسقة لتصميمات المواقع مع إمكانية النسخ الفوري</p>
          </div>
        </div>

        <button
          onClick={generateRandomPalette}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-violet-600/20"
        >
          توليد لوحة ألوان جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-64">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color, index)}
            className="rounded-3xl p-4 flex flex-col justify-end cursor-pointer transition-transform hover:-translate-y-2 relative group shadow-sm"
          >
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
              <span className="font-mono text-xs font-black text-slate-900 dark:text-white uppercase">{color}</span>
              {copiedIndex === index ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-slate-400 group-hover:text-slate-700" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};