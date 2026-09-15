export type TransactionType = 'Revenue' | 'Expense';
export type TransactionStatus = 'Paid' | 'Pending' | 'Failed';
export type TransactionCategory =
  | 'Sales'
  | 'Services'
  | 'Software'
  | 'Marketing'
  | 'Operations'
  | 'Travel'
  | 'Office'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  status: TransactionStatus;
  user_id: string;
  user_profile: string;
  transaction_type: TransactionType;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionFilterState {
  search: string;
  category: string;
  status: string;
  user: string;
  transactionType: string;
  startDate: string;
  endDate: string;
  minAmount: string;
  maxAmount: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalExpenses: number;
  netBalance: number;
  transactionCount: number;
}

export interface AnalyticsTrendItem {
  period: string;
  revenue: number;
  expenses: number;
}

export interface AnalyticsCategoryItem {
  category: string;
  type: TransactionType;
  amount: number;
  count: number;
  percentage?: number;
}

export interface FilterUserMeta {
  userId: string;
  userProfile: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}
