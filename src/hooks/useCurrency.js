import { useQuery } from '@tanstack/react-query';

// أسعار العملات الأساسية مقابل الجنيه المصري (EGP)
const egpCurrenciesData = [
  { id: 'usd', name: 'دولار أمريكي', symbol: 'USD', price: 48.50, change: 0.15, flag: '🇺🇸' },
  { id: 'eur', name: 'يورو أوروبي', symbol: 'EUR', price: 52.80, change: -0.25, flag: '🇪🇺' },
  { id: 'gbp', name: 'جنيه إسترليني', symbol: 'GBP', price: 62.40, change: 0.40, flag: '🇬🇧' },
  { id: 'sar', name: 'ريال سعودي', symbol: 'SAR', price: 12.92, change: 0.05, flag: '🇸🇦' },
  { id: 'aed', name: 'درهم إماراتي', symbol: 'AED', price: 13.20, change: 0.02, flag: '🇦🇪' },
  { id: 'kwd', name: 'دينار كويتي', symbol: 'KWD', price: 158.50, change: -0.10, flag: '🇰🇼' },
  { id: 'qar', name: 'ريال قطري', symbol: 'QAR', price: 13.31, change: 0.01, flag: '🇶🇦' },
  { id: 'cad', name: 'دولار كندي', symbol: 'CAD', price: 35.60, change: -0.30, flag: '🇨🇦' },
  { id: 'chf', name: 'فرنك سويسري', symbol: 'CHF', price: 54.20, change: 0.20, flag: '🇨🇭' },
  { id: 'jpy', name: 'ين ياباني (100)', symbol: 'JPY', price: 31.80, change: -0.15, flag: '🇯🇵' },
];

const fetchEgpRates = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return egpCurrenciesData.map((coin, index) => {
    // محاكاة تغير بسيط جداً في الأسعار مع الوقت
    const randomDelta = (Math.random() - 0.5) * 0.04;
    const newPrice = Math.max(0.1, coin.price + randomDelta);
    const newChange = coin.change + (Math.random() - 0.5) * 0.05;

    return {
      ...coin,
      current_price: parseFloat(newPrice.toFixed(2)),
      price_change_24h: parseFloat(newChange.toFixed(2)),
      rank: index + 1,
    };
  });
};

export const useCurrency = () => {
  return useQuery({
    queryKey: ['egpCurrencyRates'],
    queryFn: fetchEgpRates,
    refetchInterval: 4000, // تحديث كل 4 ثوانٍ
  });
};