import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';
import { Heart, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const { favorites, toggleFavorite } = useWishlistStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl">
          <Heart className="w-8 h-8 fill-rose-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">قائمة المفضلة</h1>
          <p className="text-sm text-slate-500">العناصر التي قمت بحفظها للرجوع إليها لاحقاً</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
          لا توجد عناصر في المفضلة حالياً.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{item.title || item.model || item.name}</h3>
                <span className="text-xs text-slate-400">{item.type || 'عنصر مخصص'}</span>
              </div>
              <button
                onClick={() => toggleFavorite(item)}
                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};