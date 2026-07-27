import React from 'react';
import { useNews } from '../hooks/useNews';
import { Newspaper, ExternalLink, Loader2, Calendar, Flag } from 'lucide-react';

export const NewsPage = () => {
  const { data: news, isLoading, isError, error } = useNews();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm text-slate-500 font-medium">جاري جلب أحدث الأخبار المصرية...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-center">
        حدث خطأ أثناء تحميل الأخبار: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-2xl">
            <Newspaper className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">أخبار مصر العاجلة</h1>
              <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded-full flex items-center gap-1">
                <Flag size={12} /> مباشر
              </span>
            </div>
            <p className="text-sm text-slate-500">متابعة لأهم التطورات والأحداث في الصحف المصرية</p>
          </div>
        </div>
      </div>

      {/* Grid News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.map((item, index) => {
          // استخراج أول صورة من تفاصيل الخبر لو كانت موجودة
          const imgMatch = item.description?.match(/src="([^"]+)"/);
          const imageUrl = item.thumbnail || (imgMatch ? imgMatch[1] : null);

          // تنظيف نص الوصف من الـ HTML Tags
          const cleanDescription = item.description
            ?.replace(/<[^>]*>?/gm, '')
            ?.slice(0, 110);

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {imageUrl && (
                  <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={13} />
                    <span>{new Date(item.pubDate).toLocaleDateString('ar-EG')}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {cleanDescription && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cleanDescription}...
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 rounded-xl transition-all"
                >
                  قراءة الخبر من المصدر <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};