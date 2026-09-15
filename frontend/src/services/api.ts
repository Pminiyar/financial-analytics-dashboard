import axios from 'axios';
import {
  ApiResponse,
  User,
  Transaction,
  Pagination,
  AnalyticsSummary,
  AnalyticsTrendItem,
  AnalyticsCategoryItem,
  FilterUserMeta,
  TransactionFilterState
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('loopr_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error catching
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect if on protected route
      localStorage.removeItem('loopr_auth_token');
      localStorage.removeItem('loopr_auth_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?expired=1';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIS ====================

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/login',
      { email, password }
    );
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/register',
      { name, email, password }
    );
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    } finally {
      localStorage.removeItem('loopr_auth_token');
      localStorage.removeItem('loopr_auth_user');
    }
  },

  getMe: async () => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  }
};

// ==================== TRANSACTIONS APIS ====================

export const transactionsApi = {
  getTransactions: async (filters: Partial<TransactionFilterState>) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.user && filters.user !== 'all') params.append('user', filters.user);
    if (filters.transactionType && filters.transactionType !== 'all') {
      params.append('transactionType', filters.transactionType);
    }
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.minAmount) params.append('minAmount', filters.minAmount);
    if (filters.maxAmount) params.append('maxAmount', filters.maxAmount);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const response = await apiClient.get<ApiResponse<{
      transactions: Transaction[];
      pagination: Pagination;
    }>>(`/transactions?${params.toString()}`);

    return response.data;
  },

  getTransactionById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data;
  },

  getFilterUsers: async () => {
    const response = await apiClient.get<ApiResponse<FilterUserMeta[]>>('/transactions/meta/users');
    return response.data;
  },

  /**
   * Generates CSV on the backend and triggers automatic browser download
   */
  exportCsv: async (columns: string[], filters: Partial<TransactionFilterState>) => {
    const response = await apiClient.post(
      '/transactions/export',
      {
        columns,
        filters: {
          search: filters.search,
          category: filters.category !== 'all' ? filters.category : undefined,
          status: filters.status !== 'all' ? filters.status : undefined,
          user: filters.user !== 'all' ? filters.user : undefined,
          transactionType: filters.transactionType !== 'all' ? filters.transactionType : undefined,
          startDate: filters.startDate,
          endDate: filters.endDate,
          minAmount: filters.minAmount,
          maxAmount: filters.maxAmount,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder
        }
      },
      {
        responseType: 'blob' // Essential for file download
      }
    );

    // Extract filename from header or provide fallback
    let filename = `financial_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('filename=') !== -1) {
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    // Trigger automatic native browser download
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { filename };
  }
};

// ==================== ANALYTICS APIS ====================

export const analyticsApi = {
  getSummary: async () => {
    const response = await apiClient.get<ApiResponse<AnalyticsSummary>>('/analytics/summary');
    return response.data;
  },

  getTrends: async () => {
    const response = await apiClient.get<ApiResponse<AnalyticsTrendItem[]>>('/analytics/trends');
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get<ApiResponse<AnalyticsCategoryItem[]>>('/analytics/categories');
    return response.data;
  }
};
