export enum Language {
  ENGLISH = 'English',
  TELUGU = 'Telugu'
}

export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  TASKS = 'TASKS',
  STORIES = 'STORIES',
  WALLET = 'WALLET',
  KYC = 'KYC',
  SUPPORT = 'SUPPORT'
}

export interface User {
  name: string;
  mobile: string;
  email: string;
  referralCode: string;
  balance: number;
  isKycVerified: boolean;
  isFaceVerified: boolean;
  referrals: number;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  durationSeconds: number;
  type: 'video' | 'ad';
  completed: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  status: 'success' | 'pending' | 'failed';
}
