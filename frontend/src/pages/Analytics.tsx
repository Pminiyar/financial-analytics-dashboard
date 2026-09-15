import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import {
  AnalyticsSummary,
  AnalyticsTrendItem,
  AnalyticsCategoryItem
} from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { RevenueExpenseChart } from '../components/dashboard/RevenueExpenseChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { CardSkeleton } from '../components/common/Loader';
import {
  PieChart,
  Percent,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const { showToast } = useToast();
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [trends, setTrends] = useState<AnalyticsTrendItem[]>([]);
  const [categories, setCategories] = useState<AnalyticsCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const [sumRes, trendRes, catRes] = await Promise.all([
          analyticsApi.getSummary(),
          analyticsApi.getTrends(),
          analyticsApi.getCategories()
        ]);
        if (sumRes.success) setSummary(sumRes.data);
        if (trendRes.success) setTrends(trendRes.data);
        if (catRes.success) setCategories(catRes.data);
      } catch (err) {
        showToast('error', 'Failed to fetch financial analytics.', 'Error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [showToast]);

  const netMargin = summary && summary.totalRevenue > 0
    ? ((summary.netBalance / summary.totalRevenue) * 100).toFixed(1)
    : '0';

  const expenseRatio = summary && summary.totalRevenue > 0
    ? ((summary.totalExpenses / summary.totalRevenue) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Advanced Financial Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Deep-dive portfolio allocation, operating margins, and longitudinal cashflow metrics.
        </p>
      </div>

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>NET PROFIT MARGIN</span>
              <Percent className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{netMargin}%</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">Healthy SaaS range (&gt;30%)</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>EXPENSE RATIO</span>
              <Layers className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{expenseRatio}%</div>
            <p className="text-xs text-slate-500 mt-1">Of total recognized revenue</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>AVG REVENUE / ENTRY</span>
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {summary && summary.transactionCount > 0
                ? formatCurrency(summary.totalRevenue / summary.transactionCount)
                : '$0.00'}
            </div>
            <p className="text-xs text-slate-500 mt-1">Blended transaction size</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>TOTAL PORTFOLIO VOLUME</span>
              <PieChart className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {summary ? formatCurrency(summary.totalRevenue + summary.totalExpenses) : '$0.00'}
            </div>
            <p className="text-xs text-slate-500 mt-1">Gross cleared capital</p>
          </div>
        </div>
      )}

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-card">
          <h2 className="text-base font-semibold text-slate-900 mb-1">Monthly Financial Trajectory</h2>
          <p className="text-xs text-slate-500 mb-4">Revenue vs expense velocity over all active fiscal periods</p>
          <RevenueExpenseChart trends={trends} isLoading={isLoading} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card">
          <h2 className="text-base font-semibold text-slate-900 mb-1">Expenditure Breakdown</h2>
          <p className="text-xs text-slate-500 mb-4">Share of total capital per budget head</p>
          <CategoryChart categories={categories} isLoading={isLoading} />
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Category Line-Item Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Transactions</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat, idx) => (
                <tr key={`${cat.category}-${idx}`} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-semibold text-slate-800">{cat.category}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        cat.type === 'Revenue'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {cat.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600 font-medium">
                    {formatNumber(cat.count)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {formatCurrency(cat.amount)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-600">
                    {cat.percentage ? `${cat.percentage}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
