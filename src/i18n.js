import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// النصوص والترجمات
const resources = {
  ar: {
    translation: {
      metroTitle: "أسعار تذاكر المترو والخريطة",
      goldTitle: "أسعار الذهب اللحظية",
      services: "خدماتي",
      home: "الرئيسية",
      lastUpdated: "آخر تحديث",
      live: "مباشر"
    }
  },
  en: {
    translation: {
      metroTitle: "Metro Tickets & Map",
      goldTitle: "Live Gold Prices",
      services: "My Services",
      home: "Home",
      lastUpdated: "Last Updated",
      live: "Live"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // اللغة الافتراضية (عربي)
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;