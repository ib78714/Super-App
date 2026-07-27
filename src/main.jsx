import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import './i18n';
import 'leaflet/dist/leaflet.css';
// إنشاء الـ QueryClient مع إعدادات افتراضية ممتازة
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // الكاش يظل صالح لمدة 5 دقائق
      refetchOnWindowFocus: false, // منع إعادة الجلب التلقائي عند تنقل التابات
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);