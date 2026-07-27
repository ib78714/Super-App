import { useQuery } from '@tanstack/react-query';

// دالة جلب المستخدمين من API خارجي (DummyJSON يوفر بيانات حقيقية ومفصلة)
const fetchUsers = async () => {
  const res = await fetch('https://dummyjson.com/users?limit=10');
  if (!res.ok) {
    throw new Error('حدث خطأ أثناء جلب بيانات المستخدمين');
  }
  return res.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'], // المعرف الخاص بالكاش (Cache Key)
    queryFn: fetchUsers,
  });
};