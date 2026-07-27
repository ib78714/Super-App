import { useQuery } from '@tanstack/react-query';

const fetchFood = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=a');
  if (!res.ok) throw new Error('فشل جلب قائمة الأطعمة');
  const data = await res.json();
  return data.meals || [];
};

export const useFood = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: fetchFood,
  });
};