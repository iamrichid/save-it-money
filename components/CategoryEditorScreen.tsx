
import React, { useState } from 'react';
import { Category } from '../types';

interface CategoryEditorScreenProps {
  salary: number;
  categories: Category[];
  onBack: () => void;
  onUpdate: (cats: Category[]) => void;
}

const CategoryEditorScreen: React.FC<CategoryEditorScreenProps> = ({ salary, categories, onBack, onUpdate }) => {
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);

  const handleSliderChange = (id: string, newVal: number) => {
    setLocalCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, amount: newVal } : cat
    ));
  };

  const handleResetToPrinciple = () => {
    if (confirm("Reset to smart suggested breakdown based on your salary?")) {
      const reset = localCategories.map(cat => ({
        ...cat,
        amount: Math.round((salary * cat.defaultPercentage) / 100)
      }));
      setLocalCategories(reset);
    }
  };

  const totalAllocated = localCategories.reduce((acc, cat) => acc + cat.amount, 0);
  const unallocated = salary - totalAllocated;

  return (
    <div className="flex flex-col h-full w-full bg-background-light dark:bg-background-dark overflow-hidden antialiased">
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-background-dark sticky top-0 z-20 border-b border-black/5 dark:border-white/5">
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          Spending Categories
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-2 pb-32 gap-6 w-full max-w-md mx-auto overflow-y-auto no-scrollbar">
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-black/5 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl transition-all duration-500"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Monthly Budget</p>
                <p className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">GHS {new Intl.NumberFormat('en-GH').format(salary)}</p>
              </div>
              <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-green-700 dark:text-green-300">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>account_balance_wallet</span>
              </div>
            </div>
            <div className="h-px w-full bg-black/5 dark:bg-white/5"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-500 text-lg">pending</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Unallocated</span>
              </div>
              <p className={`font-bold text-base ${unallocated >= 0 ? 'text-primary' : 'text-red-500'}`}>
                GHS {new Intl.NumberFormat('en-GH').format(unallocated)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-bold text-center bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white">
            Fixed (GHS)
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-center text-slate-500 dark:text-slate-400">
            Percentage (%)
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">Your Categories</h2>
          <button 
            onClick={handleResetToPrinciple}
            className="text-primary text-sm font-bold hover:underline"
          >
            Reset Default
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {localCategories.map((cat) => (
            <div key={cat.id} className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/5 transition-all hover:border-primary/30">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center rounded-xl ${cat.bgColor} shrink-0 size-12 ${cat.iconColor}`}>
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">{cat.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">{cat.subtext}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-slate-50 dark:bg-slate-800 border border-transparent rounded-lg px-2 py-1 transition-colors">
                    <p className="text-slate-900 dark:text-white text-lg font-bold">{cat.amount}</p>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{((cat.amount / salary) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-1">
                <button 
                  onClick={() => handleSliderChange(cat.id, Math.max(0, cat.amount - 50))}
                  className="size-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <div className="flex-1 h-6 flex items-center relative group">
                  <input 
                    type="range"
                    min="0"
                    max={salary}
                    step="50"
                    value={cat.amount}
                    onChange={(e) => handleSliderChange(cat.id, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <button 
                  onClick={() => handleSliderChange(cat.id, Math.min(salary, cat.amount + 50))}
                  className="size-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>
          ))}

          <button className="group w-full py-4 rounded-2xl border-2 border-dashed border-primary/40 dark:border-primary/20 text-primary font-bold flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/60 transition-all duration-300">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">add</span>
            </div>
            Add New Category
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-black/5 dark:border-white/5 p-4 z-30 pb-8">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => {
              onUpdate(localCategories);
              onBack();
            }}
            className="w-full bg-primary hover:bg-[#10d461] active:scale-[0.98] text-slate-900 font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            Update Breakdown
            <span className="material-symbols-outlined">check_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditorScreen;
