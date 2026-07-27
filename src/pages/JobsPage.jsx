import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, MapPin, ExternalLink, Loader2, Search, Filter } from 'lucide-react';

export const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [locationType, setLocationType] = useState('all'); // 'all', 'egypt', 'remote'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    // جلب وظائف متنوعة من API مفتوح ومحدث
    fetch('https://remotive.com/api/remote-jobs?limit=50')
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) {
          setJobs(data.jobs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = category === 'all' || job.category?.toLowerCase().includes(category);
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
          <Briefcase className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">سوق الوظائف والفرص الشامل</h1>
          <p className="text-sm text-slate-500">فرص عمل بمختلف التخصصات (برمجة، تسويق، إدارة، تصميم) داخل وخارج مصر</p>
        </div>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative md:col-span-2">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ابحث عن مسمى وظيفي أو اسم شركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-semibold border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <option value="all">جميع المجالات والتخصصات</option>
          <option value="software">برمجة وتطوير البرمجيات</option>
          <option value="design">تصميم واجهات و جرافيك</option>
          <option value="marketing">تسويق ومبيعات</option>
          <option value="business">إدارة ورعاية عملاء</option>
          <option value="writing">كتابة وترجمة</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm text-slate-500 font-medium">جاري تحديث قائمة الوظائف الشاملة...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">لا توجد وظائف تطابق خيارات البحث حالياً.</div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/40 transition-all shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 bg-white shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold shrink-0">
                      <Building2 size={20} />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{job.company_name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.candidate_required_location || 'عن بُعد / دولي'}
                      </span>
                      {job.category && (
                        <>
                          <span>•</span>
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                            {job.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition-all shrink-0"
                >
                  تفاصيل الوظيفة والتقديم <ExternalLink size={14} />
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};