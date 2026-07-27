import React, { useState, useEffect } from 'react';
import { Film, Star, Loader2, Calendar, Globe, Clapperboard } from 'lucide-react';

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('egypt'); // 'all', 'egypt', 'global'

  const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

  useEffect(() => {
    setLoading(true);
    let url = '';

    if (filter === 'egypt') {
      // أفلام مصرية وعربية (Original Language = ar)
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ar&sort_by=popularity.desc&language=ar-EG`;
    } else if (filter === 'global') {
      // أفلام عالمية تريند
      url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ar-EG`;
    } else {
      // مزيج شائع
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ar-EG`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, [filter]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Film className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">دليل السينما والأفلام</h1>
            <p className="text-sm text-slate-500">أحدث الأفلام المصرية والعالمية مع التقييمات والقصة</p>
          </div>
        </div>

        {/* أزرار الفلترة */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setFilter('egypt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'egypt'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clapperboard size={14} /> سينما مصرية وعربية
          </button>
          <button
            onClick={() => setFilter('global')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'global'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe size={14} /> هوليوود وعالمي
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-sm text-slate-500 font-medium">جاري جلب أحدث الأفلام والسينما...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-72 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Cover'
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 font-mono font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20">
                    <Star size={13} fill="currentColor" /> {movie.vote_average?.toFixed(1) || 'N/A'}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {movie.overview || 'لا يوجد وصف متاح لهذا الفيلم حالياً.'}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-xs text-slate-400 font-mono flex items-center gap-1 border-t border-slate-100 dark:border-slate-800/60 mt-3 pt-3">
                <Calendar size={13} /> {movie.release_date || 'تاريخ غير معروف'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};