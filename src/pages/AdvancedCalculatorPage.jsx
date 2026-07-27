import React, { useState } from 'react';
import { Calculator, History, RotateCcw, Delete, Equal } from 'lucide-react';

export const AdvancedCalculatorPage = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isRad, setIsRad] = useState(true);

  const handleBtnClick = (val) => {
    setInput((prev) => prev + val);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const calculateResult = () => {
    try {
      if (!input.trim()) return;

      let expr = input;

      expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');
      expr = expr.replace(/(\d+)%/g, '($1/100)');
      expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
      expr = expr.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
      expr = expr.replace(/\^/g, '**');

      const degToRadMultiplier = isRad ? 1 : Math.PI / 180;

      expr = expr.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin((${angle}) * ${degToRadMultiplier})`);
      expr = expr.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos((${angle}) * ${degToRadMultiplier})`);
      expr = expr.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan((${angle}) * ${degToRadMultiplier})`);

      expr = expr.replace(/asin\(([^)]+)\)/g, 'Math.asin($1)');
      expr = expr.replace(/acos\(([^)]+)\)/g, 'Math.acos($1)');
      expr = expr.replace(/atan\(([^)]+)\)/g, 'Math.atan($1)');
      expr = expr.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');
      expr = expr.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
      expr = expr.replace(/abs\(([^)]+)\)/g, 'Math.abs($1)');
      expr = expr.replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)));

      const evaluated = Function(`'use strict'; return (${expr})`)();
      
      if (isNaN(evaluated) || !isFinite(evaluated)) {
        setResult('خطأ رياضي');
      } else {
        const finalRes = Number.isInteger(evaluated) ? evaluated.toString() : evaluated.toFixed(6).replace(/\.?0+$/, '');
        setResult(finalRes);
        setHistory((prev) => [{ req: input, res: finalRes }, ...prev.slice(0, 9)]);
      }
    } catch (err) {
      setResult('خطأ في الصيغة');
    }
  };

  // كلاسات أنيقة لتنسيق الأزرار
  const numBtnClass = "p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold transition-all active:scale-95 shadow-sm";
  const sciBtnClass = "p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 font-bold transition-all active:scale-95";
  const opBtnClass = "p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all active:scale-95 shadow-md";
  const dangerBtnClass = "p-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all active:scale-95 shadow-md";
  const actionBtnClass = "p-3.5 rounded-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold transition-all active:scale-95";
  const equalBtnClass = "p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg transition-all active:scale-95 shadow-lg";

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6" dir="rtl">
      
      {/* الهيدر */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-3">
        <div className="p-3 bg-sky-600/30 border border-sky-400/30 rounded-2xl backdrop-blur-md">
          <Calculator size={30} className="text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black">الآلة الحاسبة المتقدمة</h1>
          <p className="text-xs text-slate-300 font-medium">
            جميع المعاملات الرياضية والدوال المثلثية واللوغاريتمية
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* جسم الآلة الحاسبة */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          
          {/* شاشة العرض */}
          <div className="bg-slate-950 text-white p-5 rounded-2xl space-y-2 text-left dir-ltr shadow-inner">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-b border-slate-800 pb-2">
              <button
                onClick={() => setIsRad(!isRad)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-sky-600 text-sky-400 hover:text-white transition-all"
              >
                {isRad ? 'RAD' : 'DEG'}
              </button>
              <span className="truncate max-w-[200px]">{input || '0'}</span>
            </div>
            
            <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400 min-h-[48px] break-all flex items-center justify-end">
              {result || input || '0'}
            </div>
          </div>

          {/* لوحة الأزرار */}
          <div className="grid grid-cols-5 gap-2 text-xs sm:text-sm">
            <button onClick={() => handleBtnClick('sin(')} className={sciBtnClass}>sin</button>
            <button onClick={() => handleBtnClick('cos(')} className={sciBtnClass}>cos</button>
            <button onClick={() => handleBtnClick('tan(')} className={sciBtnClass}>tan</button>
            <button onClick={() => handleBtnClick('π')} className={sciBtnClass}>π</button>
            <button onClick={handleClear} className={dangerBtnClass}>AC</button>

            <button onClick={() => handleBtnClick('asin(')} className={sciBtnClass}>asin</button>
            <button onClick={() => handleBtnClick('acos(')} className={sciBtnClass}>acos</button>
            <button onClick={() => handleBtnClick('atan(')} className={sciBtnClass}>atan</button>
            <button onClick={() => handleBtnClick('e')} className={sciBtnClass}>e</button>
            <button onClick={handleDelete} className={`${actionBtnClass} flex items-center justify-center`}>
              <Delete size={16} />
            </button>

            <button onClick={() => handleBtnClick('log(')} className={sciBtnClass}>log</button>
            <button onClick={() => handleBtnClick('ln(')} className={sciBtnClass}>ln</button>
            <button onClick={() => handleBtnClick('^')} className={sciBtnClass}>xⁿ</button>
            <button onClick={() => handleBtnClick('√(')} className={sciBtnClass}>√x</button>
            <button onClick={() => handleBtnClick('%')} className={sciBtnClass}>%</button>

            <button onClick={() => handleBtnClick('abs(')} className={sciBtnClass}>|x|</button>
            <button onClick={() => handleBtnClick('!')} className={sciBtnClass}>n!</button>
            <button onClick={() => handleBtnClick('(')} className={sciBtnClass}>(</button>
            <button onClick={() => handleBtnClick(')')} className={sciBtnClass}>)</button>
            <button onClick={() => handleBtnClick('÷')} className={opBtnClass}>÷</button>

            <button onClick={() => handleBtnClick('7')} className={numBtnClass}>7</button>
            <button onClick={() => handleBtnClick('8')} className={numBtnClass}>8</button>
            <button onClick={() => handleBtnClick('9')} className={numBtnClass}>9</button>
            <button onClick={() => handleBtnClick('×')} className={opBtnClass}>×</button>
            <button onClick={() => handleBtnClick('^2')} className={sciBtnClass}>x²</button>

            <button onClick={() => handleBtnClick('4')} className={numBtnClass}>4</button>
            <button onClick={() => handleBtnClick('5')} className={numBtnClass}>5</button>
            <button onClick={() => handleBtnClick('6')} className={numBtnClass}>6</button>
            <button onClick={() => handleBtnClick('-')} className={opBtnClass}>-</button>
            <button onClick={() => handleBtnClick('1/')} className={sciBtnClass}>1/x</button>

            <button onClick={() => handleBtnClick('1')} className={numBtnClass}>1</button>
            <button onClick={() => handleBtnClick('2')} className={numBtnClass}>2</button>
            <button onClick={() => handleBtnClick('3')} className={numBtnClass}>3</button>
            <button onClick={() => handleBtnClick('+')} className={opBtnClass}>+</button>
            <button onClick={calculateResult} className={`${equalBtnClass} row-span-2 flex items-center justify-center`}>
              <Equal size={22} />
            </button>

            <button onClick={() => handleBtnClick('0')} className={`${numBtnClass} col-span-2`}>0</button>
            <button onClick={() => handleBtnClick('.')} className={numBtnClass}>.</button>
            <button onClick={() => handleBtnClick('%')} className={opBtnClass}>mod</button>
          </div>

        </div>

        {/* السجل */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <History size={18} className="text-sky-500" />
                <h2 className="font-black text-slate-800 dark:text-slate-100 text-sm">سجل العمليات</h2>
              </div>
              <button
                onClick={() => setHistory([])}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>مسح</span>
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-center text-xs font-bold text-slate-400 py-10">لا توجد عمليات سابقة</p>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setInput(item.res); setResult(''); }}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-sky-500 transition-all text-left dir-ltr"
                  >
                    <div className="text-xs text-slate-400 font-mono">{item.req} =</div>
                    <div className="text-sm font-black text-emerald-500 font-mono">{item.res}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdvancedCalculatorPage;