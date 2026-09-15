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

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  status: TransactionStatus;
  user_id: string;
  user_profile: string;
  transaction_type: TransactionType;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionFilterParams {
  search?: string;
  category?: string;
  status?: string;
  user?: string;
  transactionType?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    transactions: T[];
    pagination: PaginationMeta;
  };
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
  amount: number;
  count: number;
  type: TransactionType;
  percentage?: number;
}
