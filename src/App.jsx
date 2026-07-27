import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useAppStore } from './store/useAppStore';

// 1. الصفحات الأساسية والتسوق
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { CarsPage } from './pages/CarsPage';
import { CurrencyPage } from './pages/CurrencyPage';
import { CryptoPage } from './pages/CryptoPage';
import { FoodPage } from './pages/FoodPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';

// 2. الأدوات التفاعلية
import { WeatherPage } from './pages/WeatherPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { PrayerPage } from './pages/PrayerPage';
import { WishlistPage } from './pages/WishlistPage';
import { TodoPage } from './pages/TodoPage';
import MapPage from './pages/MapPage';

// 3. الخدمات الحياتية والترفيهية
import { MetroPage } from './pages/MetroPage';
import { PublicTransitPage } from './pages/PublicTransitPage';
import { QrPage } from './pages/QrPage';
import { HealthPage } from './pages/HealthPage';
import { MoviesPage } from './pages/MoviesPage';
import { JobsPage } from './pages/JobsPage';
import { SportsPage } from './pages/SportsPage';
import AdvancedCalculatorPage from './pages/AdvancedCalculatorPage';
import { GoldPricesPage } from './pages/GoldPricesPage';
import { AlertBanner } from './components/AlertBanner';
import { TransitChatbot } from './components/TransitChatbot';
import { TrainsPage } from './pages/TrainsPage';
import { PharmaPage } from './pages/PharmaPage';
import { ColorPalettePage } from './pages/ColorPalettePage';
import { MarkdownPage } from './pages/MarkdownPage';
import { SpeedTestPage } from './pages/SpeedTestPage';
import { TechPricesPage } from './pages/TechPricesPage';

export default function App() {
  const { isDarkMode } = useAppStore();
  const [siteLoading, setSiteLoading] = useState(true);

  // التحكم في الوضع الداكن
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // إخفاء شاشة التحميل بعد 2.5 ثانية
  useEffect(() => {
    const timer = setTimeout(() => {
      setSiteLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 1️⃣ شاشة الافتتاحية للموقع بالكامل (Preloader)
  if (siteLoading) {
    return (
      <div style={splashStyle}>
        <div style={contentBoxStyle}>
          <div style={logoCircleStyle}>
            <span style={{ fontSize: '42px' }}>🌐</span>
          </div>

          <h1 style={brandTitleStyle}>مرحباً بك في المنصة</h1>
          <p style={brandSubtitleStyle}>جاري تحضير الواجهة واستدعاء البيانات...</p>

          <div style={trackStyle}>
            <div style={barStyle}></div>
          </div>
        </div>

        <style>{`
          @keyframes pulseLogo {
            0% { transform: scale(0.92); opacity: 0.85; }
            50% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(0.92); opacity: 0.85; }
          }
          @keyframes fillBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  // 2️⃣ التطبيق الرئيسي
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* الشريط الجانبي */}
        <Sidebar />

        {/* محتوى الصفحة الرئيسي */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <AlertBanner />
          <TransitChatbot />
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            <Routes>
              {/* أقسام البيانات والتسوق */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/currencies" element={<CurrencyPage />} />
              <Route path="/crypto" element={<CryptoPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/tech" element={<TechPricesPage />} />

              {/* الأدوات والأدوات الشخصية */}
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/advanced-calculator" element={<AdvancedCalculatorPage />} />
              <Route path="/prayer-times" element={<PrayerPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/map" element={<MapPage />} />

              {/* الخدمات الحياتية والترفيهية */}
              <Route path="/metro" element={<MetroPage />} />
              <Route path="/qr-tools" element={<QrPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/sports" element={<SportsPage />} />

              {/* الخدمات المالية والأدوات التقنية */}
              <Route path="/gold" element={<GoldPricesPage />} />
              <Route path="/trains" element={<TrainsPage />} />
              <Route path="/transit" element={<PublicTransitPage />} />
              <Route path="/pharma" element={<PharmaPage />} />
              <Route path="/palette" element={<ColorPalettePage />} />
              <Route path="/markdown" element={<MarkdownPage />} />
              <Route path="/speed" element={<SpeedTestPage />} />

              {/* الإعدادات وصفحة 404 */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center h-80 space-y-3">
                  <h1 className="text-4xl font-black text-indigo-600">404</h1>
                  <p className="text-slate-500 font-medium">عذراً، هذه الصفحة غير موجودة</p>
                </div>
              } />
            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

// 🎨 تنسيقات الشاشة الافتتاحية (Inline CSS)
const splashStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#0f172a',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#ffffff',
  direction: 'rtl'
};

const contentBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px'
};

const logoCircleStyle = {
  width: '95px',
  height: '95px',
  borderRadius: '28px',
  background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 30px rgba(2, 132, 199, 0.4)',
  marginBottom: '24px',
  animation: 'pulseLogo 2s infinite ease-in-out'
};

const brandTitleStyle = {
  fontSize: '26px',
  fontWeight: '800',
  margin: '0 0 8px 0',
  letterSpacing: '-0.5px'
};

const brandSubtitleStyle = {
  fontSize: '14px',
  color: '#94a3b8',
  margin: '0 0 28px 0'
};

const trackStyle = {
  width: '200px',
  height: '6px',
  backgroundColor: '#1e293b',
  borderRadius: '10px',
  overflow: 'hidden'
};

const barStyle = {
  height: '100%',
  backgroundColor: '#38bdf8',
  borderRadius: '10px',
  animation: 'fillBar 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
};