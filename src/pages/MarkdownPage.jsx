import React, { useState } from 'react';
import { FileCode, Eye, Download } from 'lucide-react';

export const MarkdownPage = () => {
  const [text, setText] = useState(`# مرحباً بك في محرر Markdown 👋
- اكتب أو انسخ نصوصك هنا.
- يمكنك التنسيق بسهولة.
- تدعم هذه الشاشة المعاينة الفورية.

**خط عريض** و *خط مائل* بسهولة!
`);

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'document.md';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl">
            <FileCode className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">محرر نصوص Markdown الحي</h1>
            <p className="text-sm text-slate-500">كتابة وتنسيق المستندات والملفات النصية مع التنزيل الفوري</p>
          </div>
        </div>

        <button
          onClick={downloadFile}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-xs font-bold transition-all"
        >
          <Download size={15} /> تصدير .md
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 px-2">محرر الكود/المتن</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-96 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl font-mono text-sm outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200 resize-none"
          ></textarea>
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1"><Eye size={14} /> المعاينة الحية</span>
          <div className="w-full h-96 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-y-auto whitespace-pre-wrap font-sans text-sm text-slate-800 dark:text-slate-200">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};