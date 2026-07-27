import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export const CalculatorPage = () => {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(3);

  const loanAmount = Math.max(0, price - downPayment);
  const totalInterest = loanAmount * (interestRate / 100) * years;
  const totalAmount = loanAmount + totalInterest;
  const monthlyPayment = years > 0 ? Math.round(totalAmount / (years * 12)) : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl">
          <Calculator className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">حاسبة التقسيط والقروض</h1>
          <p className="text-sm text-slate-500">احسب قسطك الشهري للسيارات أو المنتجات بمرونة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">إجمالي سعر السلعة (ج.م)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">المقدم المدفوع (ج.م)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">الفائدة السنوية (%): {interestRate}%</label>
            <input
              type="range"
              min="1"
              max="30"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">مدة التقسيط (سنوات): {years} سنة</label>
            <input
              type="range"
              min="1"
              max="7"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="bg-indigo-600 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs text-indigo-200 font-semibold">القسط الشهري المتوقع</span>
            <h2 className="text-4xl font-black font-mono mt-2">{monthlyPayment.toLocaleString()} <span className="text-lg">ج.م / شهر</span></h2>
          </div>

          <div className="space-y-3 pt-4 border-t border-indigo-500/50 text-sm">
            <div className="flex justify-between">
              <span className="text-indigo-200">مبلغ التمويل:</span>
              <span className="font-bold font-mono">{loanAmount.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-200">إجمالي الفوائد:</span>
              <span className="font-bold font-mono">{Math.round(totalInterest).toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-200">إجمالي المدفوعات:</span>
              <span className="font-bold font-mono">{Math.round(totalAmount).toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};