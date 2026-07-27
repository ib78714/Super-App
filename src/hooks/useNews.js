import { useQuery } from '@tanstack/react-query';

const fetchEgyptNews = async () => {
  // جلب تغذية أخبار مصر العاجلة
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://www.almasryalyoum.com/rss/rssfeeds'
  );

  if (!res.ok) throw new Error('فشل جلب الأخبار المصرية');
  
  const data = await res.json();
  
  if (data.status !== 'ok') {
    // المصدر الاحتياطي (أخبار مصر العاجلة)
    const fallbackRes = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.youm7.com/rss/SectionRss?SectionID=65'
    );
    const fallbackData = await fallbackRes.json();
    return fallbackData.items || [];
  }

  return data.items || [];
};

export const useNews = () => {
  return useQuery({
    queryKey: ['egyptNews'],
    queryFn: fetchEgyptNews,
    refetchInterval: 1000 * 60 * 5, // تحديث تلقائي كل 5 دقائق
  });
};