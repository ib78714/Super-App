import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-200 text-xs font-bold animate-bounce">
      {type === 'success' ? (
        <CheckCircle className="text-emerald-400 dark:text-emerald-600" size={18} />
      ) : (
        <AlertCircle className="text-rose-400 dark:text-rose-600" size={18} />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="mr-2 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
};