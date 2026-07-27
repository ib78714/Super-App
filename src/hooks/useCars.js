import { useQuery } from '@tanstack/react-query';

const fetchCarsWithGlobalPrices = async () => {
  const ratesResponse = await fetch('https://open.er-api.com/v6/latest/USD');
  const ratesData = await ratesResponse.json();
  const rates = ratesData.rates || {};

  const baseCars = [
    { id: '1', make: 'Toyota', model: 'Camry', year: 2024, basePriceUSD: 26420, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500' },
    { id: '2', make: 'Honda', model: 'Civic', year: 2024, basePriceUSD: 23950, image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=500' },
    { id: '3', make: 'BMW', model: 'M4 Competition', year: 2024, basePriceUSD: 79100, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500' },
    { id: '4', make: 'Mercedes-Benz', model: 'C-Class', year: 2024, basePriceUSD: 46950, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500' },
    { id: '5', make: 'Tesla', model: 'Model 3', year: 2024, basePriceUSD: 38990, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500' },
    { id: '6', make: 'Hyundai', model: 'Tucson', year: 2024, basePriceUSD: 27250, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500' },
  ];

  return baseCars.map((car) => ({
    ...car,
    prices: {
      USD: car.basePriceUSD,
      EGP: Math.round(car.basePriceUSD * (rates.EGP || 48.5)),
      SAR: Math.round(car.basePriceUSD * (rates.SAR || 3.75)),
      AED: Math.round(car.basePriceUSD * (rates.AED || 3.67)),
      EUR: Math.round(car.basePriceUSD * (rates.EUR || 0.92)),
    },
  }));
};

export const useCars = () => {
  return useQuery({
    queryKey: ['globalCars'],
    queryFn: fetchCarsWithGlobalPrices,
  });
};