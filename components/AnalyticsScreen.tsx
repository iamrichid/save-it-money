
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Category, Transaction, AppScreen } from '../types';
import NavigationFooter from './NavigationFooter';

interface AnalyticsScreenProps {
  salary: number;
  categories: Category[];
  transactions: Transaction[];
  onNavigate: (screen: AppScreen) => void;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ salary, categories, transactions, onNavigate }) => {
  const actualSpendPerCategory = categories.map(cat => {
    const total = transactions
      .filter(t => t.categoryId === cat.id)
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      name: cat.name.split(' ')[0],
      budget: cat.amount,
      actual: total,
      color: cat.color
    };
  });

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
  const burnRate = (totalSpent / salary) * 100;

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent">
      <header className="px-6 py-6 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/10 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Spending Insights</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Compare budget vs actual chop</p>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 pb-32 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-white/40 dark:border-white/5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Spent</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">₵{totalSpent.toFixed(0)}</p>
          </div>
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-white/40 dark:border-white/5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Salary Used</p>
            <p className={`text-xl font-black ${burnRate > 80 ? 'text-red-500' : 'text-primary'}`}>{burnRate.toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/40 dark:border-white/5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Budget vs Actual</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actualSpendPerCategory}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="actual" fill="#13ec6d" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Actual Spend</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl shadow-xl text-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">insights</span>
          </div>
          <h3 className="font-black text-lg mb-2">Smart Observation</h3>
          <p className="text-sm font-medium leading-relaxed">
            {totalSpent > salary * 0.5
              ? "Chale, you are spending fast! Take it easy on the enjoyment or fufu this weekend."
              : "You are doing great! Keep this pace and you'll have plenty for the Susu box."}
          </p>
        </div>
      </main>

      <NavigationFooter activeScreen={AppScreen.ANALYTICS} onNavigate={onNavigate} />
    </div>
  );
};

export default AnalyticsScreen;
