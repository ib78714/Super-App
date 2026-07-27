import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Search,
  Loader2 
} from 'lucide-react';
import { useCrypto } from '../hooks/useCrypto';

export const CryptoPage = () => {
  const { data: coins, isLoading, isError, error, isRefetching, refetch } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');

  // فلترة العملات بحسب البحث بالاسم أو الرمز
  const filteredCoins = coins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          جاري تحميل كافة أسعار السوق...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 my-4 text-red-700 bg-red-100 rounded-xl dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900">
        <p className="font-semibold">خطأ:</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">سوق العملات الرقمية</h1>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            متابعة لجميع العملات الرئيسية (تحديث لحظي كل 3 ثوانٍ)
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl text-sm font-medium transition-all shadow-sm w-fit"
        >
          <RefreshCw size={16} className={isRefetching ? 'animate-spin text-indigo-600' : ''} />
          {isRefetching ? 'جاري التحديث...' : 'تحديث الآن'}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث عن عملة بالاسم أو الرمز (مثل BTC, SOL)..."
          className="w-full pl-4 pr-10 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 shadow-sm"
        />
      </div>

      {/* Crypto Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredCoins?.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;

          return (
            <div
              key={coin.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              {/* Top Row: Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                      {coin.name}
                    </h3>
                    <span className="text-xs uppercase text-slate-400 font-semibold">
                      {coin.symbol}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  #{coin.market_cap_rank}
                </span>
              </div>

              {/* Price & Change */}
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <div>
                  <p className="text-[10px] text-slate-400 mb-0.5">السعر</p>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    ${coin.current_price}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-lg ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{coin.price_change_percentage_24h}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCoins?.length === 0 && (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
          لم يتم العثور على أي عملة برمز "{searchTerm}"
        </div>
      )}
    </div>
  );
};