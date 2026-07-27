import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, Headphones, Search, RefreshCw, Star, Tag, Layers } from 'lucide-react';

export const TechPricesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // جلب البيانات من الـ API
  const fetchProducts = async (category = 'all') => {
    setLoading(true);
    try {
      let url = 'https://dummyjson.com/products?limit=100';
      if (category !== 'all') {
        url = `https://dummyjson.com/products/category/${category}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const techCategories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
      const filtered = category === 'all'
        ? data.products.filter(item => techCategories.includes(item.category))
        : data.products;

      setProducts(filtered);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const displayedProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6" dir="rtl">
      
      {/* الهيدر */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-600/30 border border-sky-400/30 rounded-2xl backdrop-blur-md">
            <Layers size={30} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              دليل الأجهزة والتكنولوجيا
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              تصفح أحدث الموبايلات واللابتوبات ببيانات حقيقية من الـ API
            </p>
          </div>
        </div>
      </div>

      {/* شريط الأقسام والبحث */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* الأقسام */}
          <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full lg:w-auto gap-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedCategory('smartphones')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'smartphones' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Smartphone size={14} />
              موبايلات
            </button>
            <button
              onClick={() => setSelectedCategory('laptops')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'laptops' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Laptop size={14} />
              لابتوبات
            </button>
            <button
              onClick={() => setSelectedCategory('tablets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'tablets' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Tablet size={14} />
              تابلت
            </button>
            <button
              onClick={() => setSelectedCategory('mobile-accessories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'mobile-accessories' ? 'bg-white dark:bg-slate-700 text-sky-600 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Headphones size={14} />
              إكسسوارات
            </button>
          </div>

          {/* البحث */}
          <div className="relative w-full lg:w-80">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن جهاز أو الماركة..."
              className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

        </div>
      </div>

      {/* عرض الأجهزة */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-sky-600 space-y-3">
          <RefreshCw className="animate-spin" size={36} />
          <p className="text-xs font-bold text-slate-500">جاري تحميل المنتجات من الـ API...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center p-4">
                  {item.discountPercentage > 0 && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-[10px] font-black rounded-full shadow-md z-10 flex items-center gap-1">
                      <Tag size={10} />
                      خصم {Math.round(item.discountPercentage)}%
                    </span>
                  )}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      {item.brand || item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star size={12} className="fill-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">السعر</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    ${item.price}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  item.stock > 0 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                }`}>
                  {item.stock > 0 ? 'متوفر' : 'غير متوفر'}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TechPricesPage;