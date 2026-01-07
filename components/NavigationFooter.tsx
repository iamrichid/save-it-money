
import React from 'react';
import { AppScreen } from '../types';

interface NavigationFooterProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { screen: AppScreen.DASHBOARD, icon: 'home', label: 'Home' },
    { screen: AppScreen.WALLET, icon: 'account_balance_wallet', label: 'Wallet' },
    { screen: AppScreen.ANALYTICS, icon: 'pie_chart', label: 'Analytics' },
    { screen: AppScreen.PROFILE, icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="h-20 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-white/5 flex justify-around items-center px-2 pb-2 absolute bottom-0 w-full z-50 shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.screen;
        return (
          <button 
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
              isActive ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-current' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationFooter;
