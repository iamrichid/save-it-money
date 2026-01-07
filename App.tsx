
import React, { useState, useMemo, useEffect } from 'react';
import { AppScreen, AppState, Category, Transaction } from './types';
import { INITIAL_CATEGORIES } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import SalaryInputScreen from './components/SalaryInputScreen';
import DashboardScreen from './components/DashboardScreen';
import CategoryEditorScreen from './components/CategoryEditorScreen';
import WalletScreen from './components/WalletScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import ProfileScreen from './components/ProfileScreen';

const STORAGE_KEY = 'salarywise_gh_state_v2';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          screen: parsed.salary > 0 ? AppScreen.DASHBOARD : AppScreen.WELCOME,
          transactions: parsed.transactions || []
        };
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      screen: AppScreen.WELCOME,
      salary: 0,
      categories: INITIAL_CATEGORIES,
      transactions: [],
      bonus: 0,
      includeBonus: false,
    };
  });

  useEffect(() => {
    const stateToSave = {
      salary: state.salary,
      categories: state.categories,
      transactions: state.transactions,
      bonus: state.bonus,
      includeBonus: state.includeBonus
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state.salary, state.categories, state.transactions, state.bonus, state.includeBonus]);

  const navigateTo = (screen: AppScreen) => {
    setState(prev => ({ ...prev, screen }));
  };

  // Helper to calculate suggested amounts based on percentages
  const calculateSuggestedCategories = (salary: number, currentCategories: Category[]) => {
    return currentCategories.map(cat => ({
      ...cat,
      amount: Math.round((salary * cat.defaultPercentage) / 100)
    }));
  };

  const updateSalary = (salary: number) => {
    setState(prev => {
      // If we're updating salary, we re-apply the principle-based breakdown
      // to give the user a fresh starting point based on their new income.
      const suggestedCategories = calculateSuggestedCategories(salary, prev.categories);
      return {
        ...prev,
        salary,
        categories: suggestedCategories
      };
    });
  };

  const updateCategories = (categories: Category[]) => {
    setState(prev => ({ ...prev, categories }));
  };

  const addTransaction = (transaction: Transaction) => {
    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions]
    }));
  };

  const resetData = () => {
    if (confirm("Chale, are you sure you want to clear everything? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const totalExpenses = useMemo(() => {
    return state.categories.reduce((acc, cat) => acc + cat.amount, 0);
  }, [state.categories]);

  const remaining = useMemo(() => {
    const totalIncome = state.salary + (state.includeBonus ? state.bonus : 0);
    return totalIncome - totalExpenses;
  }, [state.salary, state.bonus, state.includeBonus, totalExpenses]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Abstract decorative blobs for glassmorphism depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto min-h-screen relative shadow-sm backdrop-blur-[2px]">

        {state.screen === AppScreen.WELCOME && (
          <WelcomeScreen onGetStarted={() => navigateTo(AppScreen.INPUT)} />
        )}

        {state.screen === AppScreen.INPUT && (
          <SalaryInputScreen
            salary={state.salary || 4500}
            onBack={() => navigateTo(AppScreen.WELCOME)}
            onContinue={(val) => {
              updateSalary(val);
              navigateTo(AppScreen.DASHBOARD);
            }}
          />
        )}

        {state.screen === AppScreen.DASHBOARD && (
          <DashboardScreen
            salary={state.salary}
            categories={state.categories}
            remaining={remaining}
            onEditCategories={() => navigateTo(AppScreen.CATEGORIES)}
            onNavigate={navigateTo}
          />
        )}

        {state.screen === AppScreen.CATEGORIES && (
          <CategoryEditorScreen
            salary={state.salary}
            categories={state.categories}
            onBack={() => navigateTo(AppScreen.DASHBOARD)}
            onUpdate={updateCategories}
          />
        )}

        {state.screen === AppScreen.WALLET && (
          <WalletScreen
            transactions={state.transactions}
            categories={state.categories}
            onNavigate={navigateTo}
            onAddTransaction={addTransaction}
          />
        )}

        {state.screen === AppScreen.ANALYTICS && (
          <AnalyticsScreen
            salary={state.salary}
            categories={state.categories}
            transactions={state.transactions}
            onNavigate={navigateTo}
          />
        )}

        {state.screen === AppScreen.PROFILE && (
          <ProfileScreen
            onNavigate={navigateTo}
            onReset={resetData}
            salary={state.salary}
          />
        )}
      </div>
    </div>
  );
};

export default App;
