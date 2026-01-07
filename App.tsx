
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-200 dark:bg-slate-900 md:p-4">
      <div className="relative w-full max-w-md h-[900px] max-h-screen md:max-h-[900px] bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden md:rounded-[3rem] border-8 border-slate-800 dark:border-slate-700">
        
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

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 dark:bg-white/10 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};

export default App;
