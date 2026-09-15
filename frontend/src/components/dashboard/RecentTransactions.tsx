import React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../../types';
import { formatDate, formatCurrency, getStatusBadgeClass } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="divide-y divide-slate-100 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div className="space-y-1.5">
                <div className="h-3.5 bg-slate-200 rounded w-48"></div>
                <div className="h-2.5 bg-slate-100 rounded w-28"></div>
              </div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-slate-500">No recent transactions recorded.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Description</th>
              <th className="pb-3 font-semibold">Category</th>
              <th className="pb-3 font-semibold text-right">Amount</th>
              <th className="pb-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.slice(0, 6).map((txn) => {
              const isRevenue = txn.transaction_type === 'Revenue';
              return (
                <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-3.5 text-xs text-slate-500 font-medium whitespace-nowrap">
                    {formatDate(txn.date)}
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isRevenue
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {isRevenue ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0 max-w-[260px] sm:max-w-xs md:max-w-sm truncate">
                        <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">
                          {txn.description}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {txn.user_profile}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                      {txn.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-semibold whitespace-nowrap">
                    <span
                      className={`text-xs sm:text-sm ${
                        isRevenue ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {isRevenue ? '+' : '-'}
                      {formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${getStatusBadgeClass(
                        txn.status
                      )}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-2 text-right">
        <Link
          to="/transactions"
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          View all transactions
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};
