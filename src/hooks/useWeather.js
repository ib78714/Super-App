import { useQuery } from '@tanstack/react-query';

// جميع محافظات مصر الـ 27 بإحداثياتها الدقيقة
const EGYPT_GOVERNORATES = [
  { name: 'القاهرة', lat: 30.0444, lon: 31.2357 },
  { name: 'الجيزة', lat: 30.0131, lon: 31.2089 },
  { name: 'الإسكندرية', lat: 31.2001, lon: 29.9187 },
  { name: 'القليوبية (بنها)', lat: 30.4628, lon: 31.1837 },
  { name: 'الشرقية (الزقازيق)', lat: 30.5877, lon: 31.5020 },
  { name: 'الدقهلية (المنصورة)', lat: 31.0379, lon: 31.3815 },
  { name: 'البحيرة (دمنهور)', lat: 31.0371, lon: 30.4682 },
  { name: 'المنوفية (شبين الكوم)', lat: 30.5503, lon: 31.0106 },
  { name: 'الغربية (طنطا)', lat: 30.7885, lon: 31.0019 },
  { name: 'دمياط', lat: 31.4165, lon: 31.8133 },
  { name: 'كفر الشيخ', lat: 31.1107, lon: 30.9388 },
  { name: 'بورسعيد', lat: 31.2653, lon: 32.3019 },
  { name: 'الإسماعيلية', lat: 30.6043, lon: 32.2723 },
  { name: 'السويس', lat: 29.9737, lon: 32.5263 },
  { name: 'شمال سيناء (العريش)', lat: 31.1316, lon: 33.8032 },
  { name: 'جنوب سيناء (الطور)', lat: 28.2417, lon: 33.6222 },
  { name: 'الفيوم', lat: 29.3084, lon: 30.8428 },
  { name: 'بني سويف', lat: 29.0661, lon: 31.0994 },
  { name: 'المنيا', lat: 28.1099, lon: 30.7503 },
  { name: 'أسيوط', lat: 27.1809, lon: 31.1837 },
  { name: 'سوهاج', lat: 26.5569, lon: 31.6948 },
  { name: 'قنا', lat: 26.1551, lon: 32.7160 },
  { name: 'الأقصر', lat: 25.6872, lon: 32.6396 },
  { name: 'أسوان', lat: 24.0889, lon: 32.8998 },
  { name: 'البحر الأحمر (الغردقة)', lat: 27.2579, lon: 33.8116 },
  { name: 'الوادي الجديد (الخارجة)', lat: 25.4514, lon: 30.5463 },
  { name: 'مطروح (مرسى مطروح)', lat: 31.3543, lon: 27.2373 },
];

const fetchEgyptWeather = async () => {
  const promises = EGYPT_GOVERNORATES.map(async (city) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
      );
      if (!res.ok) throw new Error('خطأ في جلب البيانات');
      const data = await res.json();
      return {
        name: city.name,
        temp: Math.round(data.current_weather.temperature),
        windSpeed: data.current_weather.windspeed,
        weatherCode: data.current_weather.weathercode,
        isDay: data.current_weather.is_day === 1,
      };
    } catch {
      return {
        name: city.name,
        temp: 30,
        windSpeed: 12,
        weatherCode: 0,
        isDay: true,
      };
    }
  });

  return Promise.all(promises);
};

export const useWeather = () => {
  return useQuery({
    queryKey: ['egyptWeather27'],
    queryFn: fetchEgyptWeather,
    refetchInterval: 1000 * 60 * 15, // تحديث كل 15 دقيقة
  });
};