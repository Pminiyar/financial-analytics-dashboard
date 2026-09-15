import React from 'react';
import { Transaction } from '../../types';
import { formatDate, formatCurrency, getStatusBadgeClass, getTypeBadgeClass } from '../../utils/formatters';
import { ArrowUp, ArrowDown, ChevronsUpDown, FileQuestion } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  isLoading?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  sortBy,
  sortOrder,
  onSort,
  isLoading
}) => {
  const renderSortIndicator = (field: string) => {
    if (sortBy !== field) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300 ml-1.5 inline" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-blue-600 ml-1.5 inline" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-blue-600 ml-1.5 inline" />
    );
  };

  if (!isLoading && transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">No transactions found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          No transactions match your current search and filter criteria. Try adjusting or clearing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
            <tr>
              <th
                onClick={() => onSort('date')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center">
                  <span>Date</span>
                  {renderSortIndicator('date')}
                </div>
              </th>
              <th className="py-3.5 px-4">Description</th>
              <th
                onClick={() => onSort('amount')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors text-right"
              >
                <div className="flex items-center justify-end">
                  <span>Amount</span>
                  {renderSortIndicator('amount')}
                </div>
              </th>
              <th
                onClick={() => onSort('category')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center">
                  <span>Category</span>
                  {renderSortIndicator('category')}
                </div>
              </th>
              <th
                onClick={() => onSort('status')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors text-center"
              >
                <div className="flex items-center justify-center">
                  <span>Status</span>
                  {renderSortIndicator('status')}
                </div>
              </th>
              <th className="py-3.5 px-4">Type</th>
              <th
                onClick={() => onSort('user')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center">
                  <span>User</span>
                  {renderSortIndicator('user')}
                </div>
              </th>
              <th className="py-3.5 px-4">User Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((txn) => {
              const isRevenue = txn.transaction_type === 'Revenue';
              return (
                <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Date */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                    {formatDate(txn.date)}
                  </td>

                  {/* Description */}
                  <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs truncate">
                    <span title={txn.description}>{txn.description}</span>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                    <span className={isRevenue ? 'text-emerald-600' : 'text-slate-900'}>
                      {isRevenue ? '+' : '-'}
                      {formatCurrency(txn.amount)}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {txn.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${getStatusBadgeClass(
                        txn.status
                      )}`}
                    >
                      {txn.status}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getTypeBadgeClass(
                        txn.transaction_type
                      )}`}
                    >
                      {txn.transaction_type}
                    </span>
                  </td>

                  {/* User ID */}
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-500">
                    {txn.user_id}
                  </td>

                  {/* User Profile */}
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                    {txn.user_profile}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
