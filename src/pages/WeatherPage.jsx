import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { CloudSun, Wind, Thermometer, MapPin, Loader2, Sun, Cloud, CloudRain } from 'lucide-react';

export const WeatherPage = () => {
  const { data: weatherList, isLoading, isError } = useWeather();
  const [searchQuery, setSearchQuery] = useState('');

  const getWeatherIcon = (code) => {
    if (code === 0) return <Sun className="w-10 h-10 text-amber-500 animate-pulse" />;
    if (code >= 1 && code <= 3) return <CloudSun className="w-10 h-10 text-indigo-400" />;
    if (code >= 51) return <CloudRain className="w-10 h-10 text-blue-500" />;
    return <Cloud className="w-10 h-10 text-slate-400" />;
  };

  const filteredCities = weatherList?.filter((c) =>
    c.name.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm text-slate-500 font-medium">جاري جلب طقس الـ 27 محافظة...</p>
      </div>
    );
  }

  if (isError) return <div className="p-4 text-rose-500">حدث خطأ أثناء جلب البيانات</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-2xl">
            <CloudSun className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">طقس محافظات مصر</h1>
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full text-xs font-bold">
                27 محافظة
              </span>
            </div>
            <p className="text-sm text-slate-500">متابعة حية لدرجات الحرارة في كل شبر في مصر</p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="ابحث عن محافظتك..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
        />
      </div>

      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredCities?.map((city, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                <MapPin size={16} className="text-rose-500 shrink-0" />
                <span className="truncate">{city.name}</span>
              </div>
              {getWeatherIcon(city.weatherCode)}
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {city.temp}°C
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Thermometer size={13} /> حرارة حية
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Wind size={13} className="text-blue-500" /> الرياح:
              </span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                {city.windSpeed} كم/س
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};