import React from 'react';
import { FilterUserMeta, TransactionFilterState } from '../../types';
import { RotateCcw, Filter, Calendar, DollarSign, Tag, CheckCircle, User, Activity } from 'lucide-react';

interface TransactionFiltersProps {
  filters: TransactionFilterState;
  onFilterChange: (key: keyof TransactionFilterState, value: any) => void;
  onReset: () => void;
  users: FilterUserMeta[];
  isOpen: boolean;
  onToggle: () => void;
  activeFilterCount: number;
}

const CATEGORIES = [
  'All',
  'Sales',
  'Services',
  'Software',
  'Marketing',
  'Operations',
  'Travel',
  'Office',
  'Other'
];

const STATUSES = ['All', 'Paid', 'Pending', 'Failed'];
const TYPES = ['All', 'Revenue', 'Expense'];

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  users,
  isOpen,
  onToggle,
  activeFilterCount
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all">
      {/* Filter Header / Toggle Bar */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Advanced Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1.5 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Body */}
      {isOpen && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          {/* Category Filter */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <Tag className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase() === 'all' ? 'all' : cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st.toLowerCase() === 'all' ? 'all' : st}>
                  {st === 'All' ? 'All Statuses' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type Filter */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <Activity className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Transaction Type
            </label>
            <select
              value={filters.transactionType}
              onChange={(e) => onFilterChange('transactionType', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {TYPES.map((t) => (
                <option key={t} value={t.toLowerCase() === 'all' ? 'all' : t}>
                  {t === 'All' ? 'All Types' : t}
                </option>
              ))}
            </select>
          </div>

          {/* User Filter */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <User className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              User / Team Member
            </label>
            <select
              value={filters.user}
              onChange={(e) => onFilterChange('user', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              <option value="all">All Users</option>
              {users.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.userProfile}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Min Amount */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <DollarSign className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Min Amount ($)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={filters.minAmount}
              onChange={(e) => onFilterChange('minAmount', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Max Amount */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-600 mb-1.5">
              <DollarSign className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Max Amount ($)
            </label>
            <input
              type="number"
              placeholder="50,000.00"
              value={filters.maxAmount}
              onChange={(e) => onFilterChange('maxAmount', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};
