import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { transactionsApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Transaction, TransactionFilterState, FilterUserMeta } from '../types';
import { SearchBar } from '../components/transactions/SearchBar';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { Pagination } from '../components/transactions/Pagination';
import { ExportModal } from '../components/transactions/ExportModal';
import { Button } from '../components/common/Button';
import { TableSkeleton } from '../components/common/Loader';
import { Download, RefreshCw, Layers } from 'lucide-react';

const INITIAL_FILTERS: TransactionFilterState = {
  search: '',
  category: 'all',
  status: 'all',
  user: 'all',
  transactionType: 'all',
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: '',
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  limit: 10
};

export const Transactions: React.FC = () => {
  const { showToast } = useToast();

  const [filters, setFilters] = useState<TransactionFilterState>(INITIAL_FILTERS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<FilterUserMeta[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  // Calculate count of currently active filters (excluding default pagination/sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.user !== 'all') count++;
    if (filters.transactionType !== 'all') count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.minAmount) count++;
    if (filters.maxAmount) count++;
    return count;
  }, [filters]);

  // Load filter users metadata on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await transactionsApi.getFilterUsers();
        if (res.success) {
          setUsers(res.data);
        }
      } catch {
        // Silently fail metadata dropdown
      }
    };
    fetchUsers();
  }, []);

  // Fetch transactions based on filter state
  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await transactionsApi.getTransactions(filters);
      if (res.success && res.data) {
        setTransactions(res.data.transactions);
        setTotalPages(res.data.pagination.totalPages);
        setTotalCount(res.data.pagination.total);
      }
    } catch (err: any) {
      showToast('error', 'Unable to fetch transactions. Please try again.', 'API Error');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Handle search with page reset
  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof TransactionFilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters({
      ...INITIAL_FILTERS,
      limit: filters.limit
    });
    showToast('info', 'Filters have been reset to default view.', 'Filters Reset');
  };

  // Cycle sorting: Ascending -> Descending -> Default
  const handleSort = (field: string) => {
    setFilters((prev) => {
      if (prev.sortBy !== field) {
        return { ...prev, sortBy: field, sortOrder: 'asc', page: 1 };
      }
      if (prev.sortOrder === 'asc') {
        return { ...prev, sortBy: field, sortOrder: 'desc', page: 1 };
      }
      // Revert to default date descending
      return { ...prev, sortBy: 'date', sortOrder: 'desc', page: 1 };
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newSize: number) => {
    setFilters((prev) => ({ ...prev, limit: newSize, page: 1 }));
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Transactions
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-slate-200/80 text-slate-700 rounded-full">
              {totalCount} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search, filter, analyze, and export multi-entity financial transactions.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={loadTransactions}
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

      {/* Search & Quick Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <SearchBar value={filters.search} onChange={handleSearch} />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
              isFiltersOpen || activeFilterCount > 0
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>
        </div>
      </div>

      {/* Filter Component */}
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        users={users}
        isOpen={isFiltersOpen}
        onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        activeFilterCount={activeFilterCount}
      />

      {/* Table with Loading State */}
      {isLoading ? (
        <TableSkeleton rows={filters.limit} columns={7} />
      ) : (
        <TransactionTable
          transactions={transactions}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
          isLoading={isLoading}
        />
      )}

      {/* Pagination Controls */}
      {!isLoading && totalCount > 0 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={filters.limit}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      {/* Export CSV Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        filters={filters}
        totalFilteredCount={totalCount}
      />
    </div>
  );
};
