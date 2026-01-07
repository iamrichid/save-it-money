
import React from 'react';
import { AppScreen } from '../types';
import NavigationFooter from './NavigationFooter';

interface ProfileScreenProps {
  salary: number;
  onNavigate: (screen: AppScreen) => void;
  onReset: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ salary, onNavigate, onReset }) => {
  const menuItems = [
    { icon: 'account_circle', label: 'My Info', sub: 'Kofi Manu' },
    { icon: 'payments', label: 'Income Settings', sub: `Current: GHS ${salary}`, onClick: () => onNavigate(AppScreen.INPUT) },
    { icon: 'settings', label: 'Preferences', sub: 'Currency, Notifications' },
    { icon: 'security', label: 'Security', sub: 'PIN & Biometrics' },
    { icon: 'help', label: 'Support & Feedback', sub: 'Talk to us' },
  ];

  return (
    <div className="relative flex flex-col h-full w-full bg-background-light dark:bg-background-dark">
      <header className="px-6 py-10 bg-white dark:bg-surface-dark shadow-sm flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-white dark:border-surface-dark shadow-md">
            <span className="material-symbols-outlined text-primary text-5xl">person</span>
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-slate-900 w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Kofi Manu</h2>
        <p className="text-sm text-slate-500 font-bold">Smart Saver Elite 🇬🇭</p>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-8 pb-32 space-y-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx} 
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-2xl border border-black/5 dark:border-white/5 active:bg-slate-50 dark:active:bg-background-dark transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-background-dark flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.sub}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
        ))}

        <div className="pt-8">
          <button 
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
          >
            <span className="material-symbols-outlined text-lg">delete_forever</span>
            Reset App Data
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-bold">SalaryWise Ghana v1.0.4 <br/> Built with ❤️ for the 233</p>
        </div>
      </main>

      <NavigationFooter activeScreen={AppScreen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

export default ProfileScreen;
