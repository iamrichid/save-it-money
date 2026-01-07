
import React from 'react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 dark:bg-primary/10 transition-colors group-hover:bg-primary/30">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>currency_exchange</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">SalaryWise</span>
        </div>
        <button className="rounded-full p-2 text-neutral-500 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>language</span>
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pt-4 pb-8">
        <div className="relative w-full aspect-square mb-6">
          <div className="absolute inset-0 scale-90 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl"></div>
          <div 
            className="relative h-full w-full overflow-hidden rounded-3xl bg-surface-dark/5 dark:bg-surface-dark bg-center bg-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCRmaQabI18puSq8eS11ytYyqjNB_3Ty1sSazm4FKWjPwkVSPj8krqOz33QQNESbk3XOztJH38s_SrQGGhRN2n_mu9Te3d7YVLtu2qLyePYjQC1drj3Xtgh4Ze9TK6Xk49WDoDXs9hOxumrT6xcN7or69YVYuqeIz97mqxjISA4eNw88f7C6LmX5qMBBewoxYPalaboXMYzXL0mQhLsat1Khzppl5U4OXGUvndUPJidNqiIAS-wu2CNrvvxYMrX97ij9czI7wPf_L4")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-light/80 via-transparent to-transparent dark:from-background-dark/80"></div>
          </div>
          <div className="absolute -bottom-4 -right-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1 shadow-lg dark:bg-surface-dark ring-4 ring-background-light dark:ring-background-dark">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary text-[#0d1b13]">
              <span className="font-bold text-2xl">₵</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center text-center max-w-md">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            Master Your Cedis with <span className="text-primary">SalaryWise</span>
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
            The fun, realistic way to track your net salary, taxes, and SSNIT contributions. See exactly where your money goes.
          </p>
        </div>

        <div className="flex-1"></div>

        <div className="w-full max-w-md mt-8 space-y-4">
          <button 
            onClick={onGetStarted}
            className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-primary px-8 py-4 transition-all duration-200 hover:brightness-105 active:scale-[0.98] shadow-lg shadow-primary/25"
          >
            <span className="relative z-10 text-lg font-bold text-[#0d1b13]">Get Started</span>
            <span className="absolute right-6 z-10 material-symbols-outlined text-[#0d1b13]">arrow_forward</span>
          </button>
          <div className="flex justify-center pt-2">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Already have an account? 
              <button className="ml-1 font-bold text-neutral-900 decoration-primary decoration-2 underline-offset-2 hover:underline dark:text-white">
                Log in
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center pb-4">
          <p className="text-xs font-medium text-neutral-400 flex items-center gap-1 justify-center">
            Made for Ghana <span className="text-base">🇬🇭</span> • Version 1.0
          </p>
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
