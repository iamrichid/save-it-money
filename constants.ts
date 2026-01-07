
import { Category } from './types';

// General Principle: 
// Needs (Rent, Food, Transport) ~ 75% 
// Wants (Chill) ~ 15%
// Savings (Susu) ~ 10%
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'rent',
    name: 'Roof over head',
    subtext: 'Rent & Utilities',
    icon: 'Home',
    amount: 0,
    defaultPercentage: 35,
    color: '#13ec6d',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: 'food',
    name: 'Chop Money',
    subtext: 'Kenkey, Waakye & Groceries',
    icon: 'Utensils',
    amount: 0,
    defaultPercentage: 25,
    color: '#059669',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 'transport',
    name: 'Trotro / Uber',
    subtext: 'Daily commute',
    icon: 'Bus',
    amount: 0,
    defaultPercentage: 15,
    color: '#10b981',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'chill',
    name: 'Fufu & Chill',
    subtext: 'Weekend enjoyment',
    icon: 'PartyPopper',
    amount: 0,
    defaultPercentage: 15,
    color: '#34d399',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'savings',
    name: 'Susu Box',
    subtext: 'Rainy day funds',
    icon: 'PiggyBank',
    amount: 0,
    defaultPercentage: 10,
    color: '#dcfce7',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  }
];

export const PRIMARY_GREEN = '#13ec6d';
