import React, { useState, useEffect, useCallback } from 'react';
import { analyticsApi, transactionsApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import {
  AnalyticsSummary,
  AnalyticsTrendItem,
  AnalyticsCategoryItem,
  Transaction
} from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { RevenueExpenseChart } from '../components/dashboard/RevenueExpenseChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { ExportModal } from '../components/transactions/ExportModal';
import { Button } from '../components/common/Button';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Download,
  RefreshCw
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [trends, setTrends] = useState<AnalyticsTrendItem[]>([]);
  const [categories, setCategories] = useState<AnalyticsCategoryItem[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const fetchDashboardData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setIsLoading(true);
      else setIsRefreshing(true);

      const [summaryRes, trendsRes, categoriesRes, txnsRes] = await Promise.all([
        analyticsApi.getSummary(),
        analyticsApi.getTrends(),
        analyticsApi.getCategories(),
        transactionsApi.getTransactions({ limit: 6, sortBy: 'date', sortOrder: 'desc' })
      ]);

      if (summaryRes.success) setSummary(summaryRes.data);
      if (trendsRes.success) setTrends(trendsRes.data);
      if (categoriesRes.success) setCategories(categoriesRes.data);
      if (txnsRes.success) setRecentTransactions(txnsRes.data.transactions);

      if (isSilent) {
        showToast('info', 'Dashboard metrics synchronized with latest data.', 'Refreshed');
      }
    } catch (err: any) {
      showToast('error', 'Something went wrong while fetching dashboard analytics.', 'Network Error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Financial Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{user?.name || 'Analyst'}</span>. Here is your enterprise cashflow overview.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboardData(true)}
            isLoading={isRefreshing}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 4 Core Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <SummaryCard
          title="Total Revenue"
          value={isLoading || !summary ? '...' : formatCurrency(summary.totalRevenue)}
          description="Gross recognized income"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
          trend={{ value: '+14.2% YoY', isPositive: true }}
        />

        <SummaryCard
          title="Total Expenses"
          value={isLoading || !summary ? '...' : formatCurrency(summary.totalExpenses)}
          description="Operational & capital costs"
          icon={<TrendingDown className="w-5 h-5 text-rose-600" />}
          iconBgColor="bg-rose-50"
          trend={{ value: '-3.8% MoM', isPositive: true }}
        />

        <SummaryCard
          title="Net Balance"
          value={isLoading || !summary ? '...' : formatCurrency(summary.netBalance)}
          description="Net liquidity & surplus"
          icon={<Wallet className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
          trend={{
            value: summary && summary.netBalance >= 0 ? '+18.6%' : '-5.2%',
            isPositive: !summary || summary.netBalance >= 0
          }}
        />

        <SummaryCard
          title="Total Transactions"
          value={isLoading || !summary ? '...' : formatNumber(summary.transactionCount)}
          description="Audited entries"
          icon={<Receipt className="w-5 h-5 text-indigo-600" />}
          iconBgColor="bg-indigo-50"
          trend={{ value: 'Active dataset', isNeutral: true }}
        />
      </div>

      {/* Main Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Revenue vs Expenses Trends */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Revenue vs Expenses Trends</h2>
              <p className="text-xs text-slate-500">Historical performance across operating months</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 mr-1.5"></span>
                Revenue
              </span>
              <span className="flex items-center text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 mr-1.5"></span>
                Expenses
              </span>
            </div>
          </div>
          <RevenueExpenseChart trends={trends} isLoading={isLoading} />
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">Category Distribution</h2>
            <p className="text-xs text-slate-500">Capital allocation by business function</p>
          </div>
          <CategoryChart categories={categories} isLoading={isLoading} />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent Transactions</h2>
            <p className="text-xs text-slate-500">Latest recorded debits and credits</p>
          </div>
        </div>
        <RecentTransactions transactions={recentTransactions} isLoading={isLoading} />
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        filters={{}}
        totalFilteredCount={summary?.transactionCount || 0}
      />
    </div>
  );
};
