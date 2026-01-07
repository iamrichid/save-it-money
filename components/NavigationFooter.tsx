
import React from 'react';
import * as Icons from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationFooterProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { screen: AppScreen.DASHBOARD, icon: 'Home', label: 'Home' },
    { screen: AppScreen.WALLET, icon: 'Wallet', label: 'Wallet' },
    { screen: AppScreen.ANALYTICS, icon: 'PieChart', label: 'Analytics' },
    { screen: AppScreen.PROFILE, icon: 'User', label: 'Profile' },
  ];

  return (
    <nav className="h-20 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-white/5 flex justify-around items-center px-2 pb-2 absolute bottom-0 w-full z-50 shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.screen;
        const IconComponent = (Icons as any)[item.icon];
        return (
          <button 
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
              isActive ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            <IconComponent className={`size-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
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
