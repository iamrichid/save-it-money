
import React, { useState } from 'react';

interface SalaryInputScreenProps {
  salary: number;
  onBack: () => void;
  onContinue: (val: number) => void;
}

const SalaryInputScreen: React.FC<SalaryInputScreenProps> = ({ salary, onBack, onContinue }) => {
  const [inputValue, setInputValue] = useState(salary.toString());
  const [sideHustle, setSideHustle] = useState(false);

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '.') {
      if (!inputValue.includes('.')) setInputValue(prev => prev + '.');
    } else {
      setInputValue(prev => prev === '0' ? key : prev + key);
    }
  };

  const formattedValue = new Intl.NumberFormat('en-GH').format(parseFloat(inputValue) || 0);

  return (
    <div className="relative flex h-full w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased overflow-hidden">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Let's talk money 💸</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 pt-6 pb-2 text-center">
          <h2 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-extrabold leading-[1.2]">
            What's your monthly<br/>take-home?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal py-3">
            Don't worry, this stays between us.
          </p>
        </div>

        <div className="px-6 py-4 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[320px]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-2xl">GH₵</div>
            <div className="w-full bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-6 pl-16 text-right text-4xl font-bold text-slate-900 dark:text-white shadow-sm transition-all focus-within:border-primary">
              {formattedValue}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 w-full max-w-md mx-auto">
          <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark p-5 shadow-sm transition-all hover:border-primary/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-slate-900 dark:text-white text-base font-bold leading-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">savings</span>
                  Side Hustle / Bonus
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Include other sources of income</p>
              </div>
              <button 
                onClick={() => setSideHustle(!sideHustle)}
                className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full transition-colors ${sideHustle ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`h-[27px] w-[27px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${sideHustle ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-100 dark:border-slate-800 z-20 pb-8">
        <div className="px-6 pt-6 pb-4">
          <button 
            onClick={() => onContinue(parseFloat(inputValue) || 0)}
            className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold text-lg h-14 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Break it Down
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-y-4 gap-x-6 px-8 pb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
            <button 
              key={key}
              onClick={() => handleKeyPress(key)}
              className="h-12 text-2xl font-semibold text-slate-900 dark:text-white rounded-lg flex items-center justify-center active:bg-primary/10 transition-colors"
            >
              {key === 'backspace' ? <span className="material-symbols-outlined text-[24px]">backspace</span> : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryInputScreen;
