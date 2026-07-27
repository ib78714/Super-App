import React, { useState } from 'react';
import { Bell, X, ChevronLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AlertBanner = () => {
  const { language } = useAppStore();
  const isAr = language === 'ar';
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const alerts = isAr ? [
    "🚨 تحديث: مواعيد عمل المترو تعمل بشكل منتظم حتى 12:00 منتصف الليل.",
    "✨ افتتاح محطات جديدة في خط المونوريل والـ BRT قريباً.",
    "📊 تحديث لحظي لأسعار الذهب والعملات اليوم."
  ] : [
    "🚨 Update: Metro operations running regularly until 12:00 AM.",
    "✨ New Monorail & BRT stations opening soon.",
    "📊 Live gold & currency rates updated."
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white text-xs py-2 px-4 flex items-center justify-between shadow-sm relative z-50">
      <div className="flex items-center gap-2 overflow-hidden mx-auto">
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse shrink-0">
          {isAr ? 'عاجل' : 'NEWS'}
        </span>
        <p className="font-bold truncate">
          {alerts[0]}
        </p>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-white/20 rounded-lg transition-all shrink-0"
        title="إغلاق"
      >
        <X size={14} />
      </button>
    </div>
  );
};