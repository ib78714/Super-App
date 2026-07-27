import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Loader2, AlertCircle, ShoppingCart, Star } from 'lucide-react';

export const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
        <AlertCircle size={20} />
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">المنتجات (أمازون)</h1>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-sm font-semibold">
          {products?.length} منتج
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div 
            key={product.id} 
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
          >
            {/* صورة المنتج */}
            <div className="relative h-48 bg-white p-4">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-full object-contain" 
              />
              {/* الخصم */}
              <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                {product.category}
              </span>
              
              <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2" title={product.title}>
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mt-auto">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {product.rating}
                </span>
              </div>

              <div className="flex justify-between items-end mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    ${product.price}
                  </p>
                </div>
                <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};