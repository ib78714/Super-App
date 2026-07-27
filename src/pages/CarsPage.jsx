import React, { useState } from 'react';
import { 
  Car, Search, Fuel, Palette, ChevronLeft, Heart, 
  Calculator, Check, SlidersHorizontal, Calendar
} from 'lucide-react';

const CAR_BRANDS_DATA = [
  {
    id: 'toyota',
    name: 'تويوتا',
    country: 'اليابان',
    models: [
      {
        id: 'corolla',
        name: 'كورولا (Corolla)',
        year: '2025',
        price: 24500,
        type: 'سيدان',
        fuel: 'هايبرد',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
        colors: [
          { name: 'أبيض لؤلؤي', hex: '#f8fafc' },
          { name: 'أسود ميتاليك', hex: '#0f172a' },
          { name: 'أحمر ملكي', hex: '#dc2626' }
        ]
      },
      {
        id: 'camry',
        name: 'كامري (Camry)',
        year: '2025',
        price: 31000,
        type: 'سيدان فاخرة',
        fuel: 'هايبرد',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
        colors: [
          { name: 'أبيض لؤلؤي', hex: '#f8fafc' },
          { name: 'كحلي داكن', hex: '#1e3a8a' }
        ]
      },
      {
        id: 'rav4',
        name: 'راف فور (RAV4)',
        year: '2025',
        price: 34200,
        type: 'دفع رباعي (SUV)',
        fuel: 'بنزين',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
        colors: [
          { name: 'رمادي', hex: '#475569' },
          { name: 'أزرق كلاسيك', hex: '#2563eb' }
        ]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'هيونداي',
    country: 'كوريا الجنوبية',
    models: [
      {
        id: 'elantra',
        name: 'إلنترا CN7',
        year: '2025',
        price: 22800,
        type: 'سيدان',
        fuel: 'بنزين',
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80',
        colors: [
          { name: 'فضي ميتاليك', hex: '#cbd5e1' },
          { name: 'أسود', hex: '#0f172a' }
        ]
      },
      {
        id: 'tucson',
        name: 'توسان (Tucson)',
        year: '2025',
        price: 32500,
        type: 'دفع رباعي (SUV)',
        fuel: 'بنزين',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        colors: [
          { name: 'رمادي كوانتوم', hex: '#64748b' },
          { name: 'كحلي', hex: '#1e40af' }
        ]
      }
    ]
  },
  {
    id: 'mercedes',
    name: 'مرسيدس بنز',
    country: 'ألمانيا',
    models: [
      {
        id: 'c200',
        name: 'C-Class C200',
        year: '2025',
        price: 49500,
        type: 'سيدان فاخرة',
        fuel: 'هايبرد',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
        colors: [
          { name: 'أسود ميتاليك', hex: '#020617' },
          { name: 'رمادي سلفر', hex: '#94a3b8' }
        ]
      }
    ]
  }
];

export const CarsPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  
  // حاسبة الأقساط Modal
  const [calcCar, setCalcCar] = useState(null);
  const [downPayment, setDownPayment] = useState(5000);
  const [years, setYears] = useState(3);

  // المفضلة
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // فلترة الموديلات
  const filteredBrands = CAR_BRANDS_DATA.filter((brand) => {
    if (selectedBrand !== 'all' && brand.id !== selectedBrand) return false;
    return true;
  }).map((brand) => ({
    ...brand,
    models: brand.models.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFuel = fuelFilter === 'all' || m.fuel === fuelFilter;
      return matchesSearch && matchesFuel;
    })
  })).filter((brand) => brand.models.length > 0);

  // حساب القسط الشهري
  const calculateMonthly = (price) => {
    const loanAmount = Math.max(0, price - downPayment);
    const months = years * 12;
    const interest = 1.05; // 5% فائدة سنوية تقريبية
    return Math.round((loanAmount * interest) / months);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6" dir="rtl">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-600/30 border border-sky-400/30 rounded-2xl backdrop-blur-md">
            <Car size={32} className="text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">معرض السيارات المتكامل</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              تصفح السيارات، احسب القسط الشهري، وقارن بين الخيارات المتاحة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <Heart size={18} className="text-rose-500 fill-rose-500" />
          <span className="text-xs font-bold">المفضلة: {favorites.length} سيارات</span>
        </div>
      </div>

      {/* Control Bar: Brands & Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Brand Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex-shrink-0 ${
              selectedBrand === 'all'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            جميع الماركات
          </button>

          {CAR_BRANDS_DATA.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex-shrink-0 ${
                selectedBrand === brand.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Search & Fuel Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن موديل معين..."
              className="w-full pr-11 pl-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">جميع المحركات</option>
            <option value="بنزين">بنزين فقط</option>
            <option value="هايبرد">هايبرد (Hybrid)</option>
          </select>
        </div>

      </div>

      {/* Grid Cars */}
      <div className="space-y-10">
        {filteredBrands.map((brand) => (
          <div key={brand.id} className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                سيارات {brand.name} ({brand.country})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.models.map((model) => {
                const isFav = favorites.includes(model.id);

                return (
                  <div
                    key={model.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      
                      {/* Header Card */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase">
                            {model.type}
                          </span>
                          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                            {model.name}
                          </h3>
                        </div>
                        
                        <button
                          onClick={() => toggleFavorite(model.id)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-transform"
                        >
                          <Heart
                            size={18}
                            className={isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}
                          />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="h-48 w-full rounded-2xl overflow-hidden bg-slate-100 relative group">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Fuel & Year Info */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
                        <div className="flex items-center gap-1">
                          <Fuel size={14} className="text-sky-500" />
                          <span>{model.fuel}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-amber-500" />
                          <span>موديل {model.year}</span>
                        </div>
                      </div>

                    </div>

                    {/* Price & Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">السعر النقدي</span>
                          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                            ${model.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Calculator Button */}
                        <button
                          onClick={() => setCalcCar(model)}
                          className="px-3 py-2 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-sky-100"
                        >
                          <Calculator size={14} />
                          <span>حاسبة القسط</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Calculator */}
      {calcCar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-md w-full space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-800 dark:text-slate-100">
                حاسبة أقساط: {calcCar.name}
              </h3>
              <button 
                onClick={() => setCalcCar(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-500 mb-1">المقدم المدفوع ($):</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">مدة التقسيط (سنوات):</label>
                <select
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                >
                  <option value={1}>سنة واحدة (12 شهر)</option>
                  <option value={3}>3 سنوات (36 شهر)</option>
                  <option value={5}>5 سنوات (60 شهر)</option>
                </select>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 rounded-2xl text-center space-y-1">
                <span className="text-slate-500 block">القسط الشهري التقريبي</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ${calculateMonthly(calcCar.price)} / شهرياً
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CarsPage;