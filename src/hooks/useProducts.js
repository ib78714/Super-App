import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  // بنجيب 50 منتج متنوع زي أمازون
  const res = await fetch('https://dummyjson.com/products?limit=50');
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data.products; 
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};