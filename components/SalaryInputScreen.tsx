
import React, { useState } from 'react';

interface SalaryInputScreenProps {
  initialSalary: number;
  initialBonus: number;
  initialIncludeBonus: boolean;
  onBack: () => void;
  onContinue: (salary: number, bonus: number, includeBonus: boolean) => void;
}

const SalaryInputScreen: React.FC<SalaryInputScreenProps> = ({ 
  initialSalary, 
  initialBonus, 
  initialIncludeBonus,
  onBack, 
  onContinue 
}) => {
  const [activeInput, setActiveInput] = useState<'salary' | 'bonus'>('salary');
  const [salaryValue, setSalaryValue] = useState(initialSalary.toString());
  const [bonusValue, setBonusValue] = useState(initialBonus.toString());
  const [sideHustle, setSideHustle] = useState(initialIncludeBonus);

  const handleKeyPress = (key: string) => {
    const currentVal = activeInput === 'salary' ? salaryValue : bonusValue;
    const setter = activeInput === 'salary' ? setSalaryValue : setBonusValue;

    if (key === 'backspace') {
      setter(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '.') {
      if (!currentVal.includes('.')) setter(prev => prev + '.');
    } else {
      setter(prev => prev === '0' ? key : prev + key);
    }
  };

  const totalIncome = (parseFloat(salaryValue) || 0) + (sideHustle ? (parseFloat(bonusValue) || 0) : 0);

  return (
    <div className="relative flex h-full w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased overflow-hidden">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center pr-12">Income Details</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="px-6 pt-6 pb-2 text-center">
          <h2 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-extrabold leading-tight">
            How much you <br/> making, chale?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium py-2">
            Enter your basic pay and any extra side-chop.
          </p>
        </div>

        <div className="px-6 py-4 flex flex-col gap-6">
          {/* Salary Field */}
          <div 
            onClick={() => setActiveInput('salary')}
            className={`relative w-full rounded-2xl p-5 border-2 transition-all cursor-pointer ${
              activeInput === 'salary' ? 'border-primary bg-white dark:bg-surface-dark shadow-md' : 'border-transparent bg-slate-100 dark:bg-slate-800'
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Base Salary</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-400">GH₵</span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {new Intl.NumberFormat('en-GH').format(parseFloat(salaryValue) || 0)}
              </span>
            </div>
          </div>

          {/* Bonus Toggle Area */}
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Side Hustle / Bonus</p>
                  <p className="text-xs text-slate-500">Add other income sources</p>
                </div>
              </div>
              <button 
                onClick={() => setSideHustle(!sideHustle)}
                className={`relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full transition-colors ${sideHustle ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <div className={`h-[24px] w-[24px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${sideHustle ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {sideHustle && (
              <div 
                onClick={() => setActiveInput('bonus')}
                className={`mt-4 relative w-full rounded-2xl p-4 border-2 transition-all cursor-pointer animate-in fade-in slide-in-from-top-2 ${
                  activeInput === 'bonus' ? 'border-primary bg-white dark:bg-slate-900 shadow-sm' : 'border-transparent bg-slate-50 dark:bg-background-dark'
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bonus Amount</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-400">GH₵</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {new Intl.NumberFormat('en-GH').format(parseFloat(bonusValue) || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Total Summary */}
        <div className="px-6 py-2 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Monthly Net</p>
          <p className="text-2xl font-black text-primary">₵{new Intl.NumberFormat('en-GH').format(totalIncome)}</p>
        </div>
      </div>

      {/* Numeric Keypad Area */}
      <div className="bg-white dark:bg-surface-dark rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-slate-100 dark:border-slate-800 z-20 pb-10">
        <div className="px-6 pt-6 pb-6">
          <button 
            onClick={() => onContinue(parseFloat(salaryValue) || 0, parseFloat(bonusValue) || 0, sideHustle)}
            className="w-full bg-primary hover:scale-[1.02] text-slate-900 font-bold text-lg h-16 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Break it Down
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-y-3 gap-x-6 px-10">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
            <button 
              key={key}
              onClick={() => handleKeyPress(key)}
              className="h-12 text-2xl font-bold text-slate-900 dark:text-white rounded-xl flex items-center justify-center active:bg-primary/10 active:scale-90 transition-all"
            >
              {key === 'backspace' ? <span className="material-symbols-outlined text-[24px] text-primary">backspace</span> : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryInputScreen;
