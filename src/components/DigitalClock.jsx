import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex items-center gap-2 bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 px-3 py-1.5 rounded-xl text-white shadow-sm">
      <Clock size={16} className="text-amber-400 animate-pulse shrink-0" />
      <span className="text-xs sm:text-sm font-bold font-mono tracking-wide text-amber-300 dir-ltr">
        {formattedTime}
      </span>
    </div>
  );
};