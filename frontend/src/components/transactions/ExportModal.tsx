import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { transactionsApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { TransactionFilterState } from '../../types';
import { Download, CheckSquare, Square, FileSpreadsheet, Eye } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Partial<TransactionFilterState>;
  totalFilteredCount: number;
}

interface ColumnOption {
  id: string;
  label: string;
  description: string;
  defaultSelected: boolean;
}

const ALL_COLUMNS: ColumnOption[] = [
  { id: 'date', label: 'Date', description: 'Transaction execution date (YYYY-MM-DD)', defaultSelected: true },
  { id: 'amount', label: 'Amount', description: 'Financial value in USD ($)', defaultSelected: true },
  { id: 'category', label: 'Category', description: 'Budget category classification', defaultSelected: true },
  { id: 'status', label: 'Status', description: 'Settlement state (Paid, Pending, Failed)', defaultSelected: true },
  { id: 'description', label: 'Description', description: 'Detailed note or vendor info', defaultSelected: true },
  { id: 'transaction_type', label: 'Transaction Type', description: 'Revenue or Expense', defaultSelected: true },
  { id: 'user_profile', label: 'User Profile', description: 'Team member name and title', defaultSelected: true },
  { id: 'user', label: 'User ID', description: 'Internal user identifier (e.g. usr_001)', defaultSelected: false },
  { id: 'id', label: 'Transaction ID', description: 'Unique database transaction identifier', defaultSelected: false }
];

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  filters,
  totalFilteredCount
}) => {
  const { showToast } = useToast();
  const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
    ALL_COLUMNS.filter((c) => c.defaultSelected).map((c) => c.id)
  );
  const [isExporting, setIsExporting] = useState(false);

  const toggleColumn = (id: string) => {
    if (selectedColumns.includes(id)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== id));
    } else {
      setSelectedColumns([...selectedColumns, id]);
    }
  };

  const handleSelectAll = () => {
    setSelectedColumns(ALL_COLUMNS.map((c) => c.id));
  };

  const handleClearAll = () => {
    setSelectedColumns([]);
  };

  const handleExport = async () => {
    if (selectedColumns.length === 0) {
      showToast('warning', 'Please select at least one column to export.', 'No Columns Selected');
      return;
    }

    try {
      setIsExporting(true);
      const result = await transactionsApi.exportCsv(selectedColumns, filters);
      showToast(
        'success',
        `Successfully downloaded ${result.filename} with ${totalFilteredCount} transactions!`,
        'CSV Export Complete'
      );
      onClose();
    } catch (error: any) {
      showToast('error', 'Unable to generate the CSV. Please try again.', 'CSV Export Failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Transactions to CSV"
      subtitle="Select the specific data fields you want to include in your financial report."
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Scope Banner */}
        <div className="flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              Target report dataset:{' '}
              <strong className="font-semibold text-blue-800">{totalFilteredCount} transactions</strong> based on current filters.
            </span>
          </div>
          <span className="font-semibold bg-white px-2.5 py-1 rounded-lg border border-blue-200 text-blue-700">
            {selectedColumns.length} / {ALL_COLUMNS.length} Columns
          </span>
        </div>

        {/* Selection Tools */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Available Export Columns
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Select All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Column Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
          {ALL_COLUMNS.map((col) => {
            const isChecked = selectedColumns.includes(col.id);
            return (
              <label
                key={col.id}
                onClick={() => toggleColumn(col.id)}
                className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'border-blue-300 bg-blue-50/40 text-slate-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0">
                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900">{col.label}</div>
                  <div className="text-[11px] text-slate-500 truncate">{col.description}</div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Live Column Preview */}
        {selectedColumns.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <Eye className="w-3.5 h-3.5 mr-1 text-slate-400" />
              CSV Header Preview
            </div>
            <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700">
              {selectedColumns.map((cId) => {
                const col = ALL_COLUMNS.find((c) => c.id === cId);
                return (
                  <span
                    key={cId}
                    className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[11px]"
                  >
                    {col?.label || cId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            isLoading={isExporting}
            icon={<Download className="w-4 h-4" />}
            disabled={selectedColumns.length === 0}
          >
            Download CSV Report
          </Button>
        </div>
      </div>
    </Modal>
  );
};
