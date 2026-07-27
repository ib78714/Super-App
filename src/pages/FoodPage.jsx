import React from 'react';
import { useFood } from '../hooks/useFood';
import { Utensils, Loader2, Globe, Flame } from 'lucide-react';

export const FoodPage = () => {
  const { data: meals, isLoading, isError, error } = useFood();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) return <div className="p-4 text-red-500">خطأ: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Utensils className="w-8 h-8 text-amber-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">قائمة الأطعمة العالمية</h1>
            <p className="text-sm text-slate-500">أشهر الوصفات والأطباق العالمية مباشر من TheMealDB API</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals?.map((meal) => (
          <div key={meal.idMeal} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-44 object-cover" />
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
                  <span className="flex items-center gap-1"><Globe size={12}/> {meal.strArea}</span>
                  <span>{meal.strCategory}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">{meal.strMeal}</h3>
              </div>
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="w-full py-2 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition-colors block">
                مشاهدة طريقة التحضير
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};