
export enum AppScreen {
  WELCOME = 'welcome',
  INPUT = 'input',
  DASHBOARD = 'dashboard',
  CATEGORIES = 'categories',
  WALLET = 'wallet',
  ANALYTICS = 'analytics',
  PROFILE = 'profile'
}

export interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  date: string;
  note: string;
}

export interface Category {
  id: string;
  name: string;
  subtext: string;
  icon: string;
  amount: number;
  defaultPercentage: number; // The principle-based percentage
  color: string;
  bgColor: string;
  iconColor: string;
  percentage?: number;
}

export interface AppState {
  screen: AppScreen;
  salary: number;
  categories: Category[];
  transactions: Transaction[];
  bonus: number;
  includeBonus: boolean;
}
