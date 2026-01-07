
import React, { useState } from 'react';
import { Transaction, Category, AppScreen } from '../types';
import NavigationFooter from './NavigationFooter';

interface WalletScreenProps {
  transactions: Transaction[];
  categories: Category[];
  onNavigate: (screen: AppScreen) => void;
  onAddTransaction: (t: Transaction) => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ transactions, categories, onNavigate, onAddTransaction }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [amount, setAmount] = useState('');
  const [catId, setCatId] = useState(categories[0]?.id || '');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onAddTransaction({
      id: Math.random().toString(36).substr(2, 9),
      categoryId: catId,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      note: note || 'Spend'
    });
    setAmount('');
    setNote('');
    setShowAdd(false);
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent">
      <header className="px-6 py-6 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/10 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Pocket History</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Chale, what did you buy today?</p>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 pb-32">
        {showAdd ? (
          <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-primary/20 mb-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Add Spend</h3>
              <button type="button" onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-red-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount (GHS)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl p-4 text-xl font-bold text-slate-900 dark:text-white mt-1 focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
              <select
                value={catId}
                onChange={e => setCatId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl p-4 text-sm font-bold text-slate-900 dark:text-white mt-1"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Note</label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="What for?"
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl p-4 text-sm font-bold text-slate-900 dark:text-white mt-1"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">
              Save Spend
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full bg-primary/10 border-2 border-dashed border-primary/30 text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mb-8 hover:bg-primary/20 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Log new spend
          </button>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-slate-100 dark:bg-surface-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">receipt_long</span>
              </div>
              <p className="text-slate-400 font-medium">No spends yet. <br /> Don't be too stingy chale!</p>
            </div>
          ) : (
            transactions.map(t => {
              const cat = categories.find(c => c.id === t.categoryId) || categories[0];
              return (
                <div key={t.id} className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${cat.bgColor} ${cat.iconColor} flex items-center justify-center`}>
                      <span className="material-symbols-outlined">{cat.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{t.note}</p>
                      <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString('en-GH', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-500">- ₵{t.amount}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{cat.name.split(' ')[0]}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <NavigationFooter activeScreen={AppScreen.WALLET} onNavigate={onNavigate} />
    </div>
  );
};

export default WalletScreen;
