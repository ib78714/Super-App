import React, { useState } from 'react';
import { Bus, Train, Ticket, Clock, MapPin, Search, ShieldCheck, Zap, Info, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

// داتا الخدمات والمواصلات الحديثة
const transitServices = [
  {
    id: 'lrt',
    titleAr: 'القطار الكهربائي الخفيف (LRT)',
    titleEn: 'Light Rail Transit (LRT)',
    category: 'lrt',
    color: 'from-blue-600 to-indigo-700',
    badge: 'كهربائي / صديق للبيئة',
    routeAr: 'محطة عدلي منصور ↔ العاصمة الإدارية / مدينة الفنون والثقافة / العاشر من رمضان',
    routeEn: 'Adly Mansour ↔ New Administrative Capital / Arts & Culture / 10th of Ramadan',
    scheduleAr: 'من الساعة 06:00 صباحاً حتى 11:30 مساءً (كل 15 - 20 دقيقة)',
    scheduleEn: '06:00 AM – 11:30 PM (Every 15 - 20 mins)',
    pricing: [
      { zonesAr: 'حتى 3 محطات', zonesEn: 'Up to 3 stations', price: 10 },
      { zonesAr: 'من 4 إلى 7 محطات', zonesEn: '4 to 7 stations', price: 15 },
      { zonesAr: 'أكثر من 7 محطات', zonesEn: 'More than 7 stations', price: 20 },
    ],
    featuresAr: ['مكيف بالكامل', 'واي فاي وشواحن USB', 'شاشات إلكترونية وشبكة مخصصة لذوي الهمم'],
    featuresEn: ['Fully Air-Conditioned', 'Wi-Fi & USB Chargers', 'Accessible & Electronic Displays']
  },
  {
    id: 'monorail-east',
    titleAr: 'مونوريل شرق النيل (العاصمة الإدارية)',
    titleEn: 'East Nile Monorail (Capital Monorail)',
    category: 'monorail',
    color: 'from-amber-500 to-orange-600',
    badge: 'معلق سريعة',
    routeAr: 'محطة الاستاد (مدينة نصر) ↔ العاصمة الإدارية الجديدة (22 محطة)',
    routeEn: 'Stadium St. (Nasr City) ↔ New Administrative Capital (22 Stations)',
    scheduleAr: 'من 06:30 صباحاً حتى 11:00 مساءً',
    scheduleEn: '06:30 AM – 11:00 PM',
    pricing: [
      { zonesAr: 'التذكرة الموحدة (تقديري)', zonesEn: 'Standard Ticket (Est.)', price: 25 },
    ],
    featuresAr: ['قطار أوتوماتيكي بدون سائق', 'ربط مع الخط الثالث للمترو بمدينة نصر', 'إطلالة بانورامية وسرعة عالية'],
    featuresEn: ['Driverless Automated Train', 'Connected with Metro Line 3', 'High Speed & Panoramic View']
  },
  {
    id: 'brt',
    titleAr: 'الأتوبيس الترددي السريع (BRT)',
    titleEn: 'Bus Rapid Transit (BRT)',
    category: 'brt',
    color: 'from-emerald-600 to-teal-700',
    badge: 'مسار مخصص على الدائري',
    routeAr: 'المسار الدائري الكلي حول القاهرة الكبرى (ربط المحاور الرئيسية)',
    routeEn: 'Cairo Ring Road Loop (Connecting Major Highways)',
    scheduleAr: 'شغال على مدار 24 ساعة (تردد كل 5 - 10 دقائق)',
    scheduleEn: '24/7 Operations (Frequency every 5-10 mins)',
    pricing: [
      { zonesAr: 'الرحلة القصيرة', zonesEn: 'Short Journey', price: 10 },
      { zonesAr: 'الرحلة الطويلة / الكلية', zonesEn: 'Long/Full Journey', price: 15 },
    ],
    featuresAr: ['بديل الميكروباص على الدائري', 'محطات علوية مؤمنة بكباري مشاة', 'حجز إلكتروني بكارت واحد'],
    featuresEn: ['Ring Road Microbus Alternative', 'Pedestrian Bridges & Pedestrian Access', 'Smart Card Ticketing']
  },
  {
    id: 'cta-electric',
    titleAr: 'أتوبيسات النقل العام الكهربائية والمكيفة',
    titleEn: 'Electric CTA & Smart Air-Conditioned Buses',
    category: 'bus',
    color: 'from-rose-600 to-pink-700',
    badge: 'نقل عام صديق للبيئة',
    routeAr: 'محيط القاهرة الكبرى، التجمع، الشروق، الشيخ زايد، ووسط البلد',
    routeEn: 'Greater Cairo, Tagamoa, El Shorouk, Sheikh Zayed, DownTown',
    scheduleAr: 'من 06:00 صباحاً حتى 12:00 منتصف الليل',
    scheduleEn: '06:00 AM – 12:00 AM',
    pricing: [
      { zonesAr: 'الأتوبيس المكيف العادي', zonesEn: 'Standard AC Bus', price: 12 },
      { zonesAr: 'الأتوبيس الكهربائي الذكي', zonesEn: 'Smart Electric Bus', price: 15 },
    ],
    featuresAr: ['دفع بكروت مسبقة الدفع', 'مدخل مخصص للكراسي المتحركة', 'تكييف وتتبع GPS'],
    featuresEn: ['Prepaid Card Payment', 'Wheelchair Access', 'Air-Conditioned & GPS Tracking']
  }
];

export const PublicTransitPage = () => {
  const { language } = useAppStore();
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // الفلترة والبحث
  const filteredServices = transitServices.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const title = isAr ? item.titleAr : item.titleEn;
    const route = isAr ? item.routeAr : item.routeEn;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6">
      
      {/* الهيدر الرئيسي */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/30 border border-indigo-400/30 rounded-2xl backdrop-blur-md">
            <Zap size={30} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'دليل المواصلات الحديثة والبديلة' : 'Smart & Alternative Public Transit'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {isAr ? 'أسعار التذاكر، المواعيد، وخطوط سير (القطار الكهربائي LRT، المونوريل، والـ BRT)' : 'Fare pricing, timetables & routes for LRT, Monorail & BRT'}
            </p>
          </div>
        </div>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* أزرار الفئات */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { id: 'all', labelAr: 'الكل', labelEn: 'All' },
            { id: 'lrt', labelAr: 'القطار الكهربائي LRT', labelEn: 'LRT Train' },
            { id: 'monorail', labelAr: 'المونوريل', labelEn: 'Monorail' },
            { id: 'brt', labelAr: 'الأتوبيس الترددي BRT', labelEn: 'BRT Bus' },
            { id: 'bus', labelAr: 'النقل الذكي', labelEn: 'Smart Buses' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* مربع البحث */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 ltr:left-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'ابحث عن وسيلة أو منطقة...' : 'Search transit or area...'}
            className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 rtl:pr-9 rtl:pl-3 ltr:pl-9 ltr:pr-3"
          />
        </div>

      </div>

      {/* قائمة الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* هيدر الكارت */}
              <div className={`bg-gradient-to-r ${service.color} p-5 text-white flex items-center justify-between`}>
                <div>
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-[10px] font-black rounded-lg uppercase tracking-wider mb-2 inline-block">
                    {service.badge}
                  </span>
                  <h3 className="text-lg font-black">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  {service.category === 'bus' || service.category === 'brt' ? <Bus size={24} /> : <Train size={24} />}
                </div>
              </div>

              {/* تفاصيل خط السير والمواعيد */}
              <div className="p-5 space-y-4 text-xs">
                
                {/* خط السير */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                    <MapPin size={14} className="text-indigo-500" />
                    <span>{isAr ? 'خط السير والنطاق:' : 'Route Coverage:'}</span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    {isAr ? service.routeAr : service.routeEn}
                  </p>
                </div>

                {/* المواعيد */}
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                  <Clock size={16} className="text-amber-500 shrink-0" />
                  <span><strong>{isAr ? 'مواعيد التشغيل:' : 'Hours:'}</strong> {isAr ? service.scheduleAr : service.scheduleEn}</span>
                </div>

                {/* أسعار التذاكر */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                    <Ticket size={14} className="text-emerald-500" />
                    <span>{isAr ? 'أسعار التذاكر والفئات:' : 'Ticket Fares:'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.pricing.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/50">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{isAr ? p.zonesAr : p.zonesEn}</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">{p.price} {isAr ? 'ج.م' : 'EGP'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* المميزات */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-400 mb-1.5">{isAr ? 'المميزات والخدمات:' : 'Features:'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(isAr ? service.featuresAr : service.featuresEn).map((feat, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-lg">
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* فوتر الكارت */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                {isAr ? 'معلومات محدثة رسمياً' : 'Official Updated Info'}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};