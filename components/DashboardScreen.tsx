
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Category, AppScreen } from '../types';
import { getFinancialTip } from '../services/gemini';
import NavigationFooter from './NavigationFooter';

interface DashboardScreenProps {
  salary: number;
  categories: Category[];
  remaining: number;
  onEditCategories: () => void;
  onNavigate: (screen: AppScreen) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ salary, categories, remaining, onEditCategories, onNavigate }) => {
  const [tip, setTip] = useState("Loading your financial tip...");

  useEffect(() => {
    const fetchTip = async () => {
      const aiTip = await getFinancialTip(salary, remaining);
      setTip(aiTip);
    };
    fetchTip();
  }, [salary, remaining]);

  const data = categories.map(cat => ({
    name: cat.name,
    value: cat.amount,
    color: cat.color
  }));

  if (remaining > 0) {
    data.push({ name: 'Remaining', value: remaining, color: '#dcfce7' });
  }

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent">
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <button className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">October Money</h2>
        <button className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-6 pt-2 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm text-primary-dark dark:text-primary border border-white/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(19,236,109,0.5)]"></span>
            <span className="text-xs font-bold uppercase tracking-wide">Status: {remaining > 0 ? 'Safe' : 'Watch out'}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
            <span className="text-lg font-bold text-slate-500 dark:text-slate-400 align-top mt-2 inline-block mr-1">GHS</span>
            {new Intl.NumberFormat('en-GH').format(salary)}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Chale, here's your money</p>
        </div>

        <div className="px-6 py-4 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={85}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Remaining</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-white mt-1">GHS {new Intl.NumberFormat('en-GH').format(remaining)}</span>
              <span className="text-primary text-xs font-bold mt-1">+2% vs Sept</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.slice(0, 4).map(cat => (
              <div key={cat.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{cat.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Where e go?</h3>
            <button
              onClick={onEditCategories}
              className="text-sm font-bold text-primary hover:text-primary-dark"
            >
              Adjust
            </button>
          </div>

          {categories.map((cat) => (
            <div key={cat.id} className="group bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 active:scale-[0.98] transition-all hover:bg-white/70 dark:hover:bg-black/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bgColor} ${cat.iconColor} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{cat.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{cat.subtext}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">GHS {cat.amount}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{((cat.amount / salary) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-black/20 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(cat.amount / salary) * 100}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}

          <div className="pt-4 pb-2 text-center px-4">
            <p className="text-xs text-slate-400 italic font-medium">"{tip}"</p>
          </div>
        </div>
      </main>

      <button
        onClick={() => onNavigate(AppScreen.WALLET)}
        className="absolute bottom-24 right-6 w-14 h-14 bg-primary text-slate-900 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <NavigationFooter activeScreen={AppScreen.DASHBOARD} onNavigate={onNavigate} />
    </div>
  );
};

export default DashboardScreen;
