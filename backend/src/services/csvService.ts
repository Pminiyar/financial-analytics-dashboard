import { ITransaction } from '../types';

export interface ColumnDefinition {
  key: string;
  header: string;
  format: (transaction: ITransaction) => string | number;
}

export const AVAILABLE_COLUMNS: Record<string, ColumnDefinition> = {
  id: {
    key: 'id',
    header: 'Transaction ID',
    format: (t) => t.id
  },
  date: {
    key: 'date',
    header: 'Date',
    format: (t) => t.date
  },
  amount: {
    key: 'amount',
    header: 'Amount ($)',
    format: (t) => t.amount.toFixed(2)
  },
  category: {
    key: 'category',
    header: 'Category',
    format: (t) => t.category
  },
  status: {
    key: 'status',
    header: 'Status',
    format: (t) => t.status
  },
  user: {
    key: 'user',
    header: 'User ID',
    format: (t) => t.user_id
  },
  user_profile: {
    key: 'user_profile',
    header: 'User Profile',
    format: (t) => t.user_profile
  },
  transaction_type: {
    key: 'transaction_type',
    header: 'Transaction Type',
    format: (t) => t.transaction_type
  },
  description: {
    key: 'description',
    header: 'Description',
    format: (t) => t.description
  }
};

export class CsvService {
  /**
   * Escapes a single cell value according to RFC 4180
   */
  private static escapeCell(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    const stringValue = String(value);
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  /**
   * Validates requested column keys and returns valid keys
   */
  static validateColumns(requestedColumns?: string[]): string[] {
    const validKeys = Object.keys(AVAILABLE_COLUMNS);
    if (!requestedColumns || !Array.isArray(requestedColumns) || requestedColumns.length === 0) {
      // Default to standard columns if none requested
      return ['date', 'amount', 'category', 'status', 'description', 'user_profile', 'transaction_type'];
    }

    const normalized = requestedColumns
      .map(k => k.toLowerCase().replace(/[\s-]/g, '_'))
      .filter(k => validKeys.includes(k));

    return normalized.length > 0
      ? normalized
      : ['date', 'amount', 'category', 'status', 'description'];
  }

  /**
   * Generates formatted CSV string from transactions and requested columns
   */
  static generateCsv(transactions: ITransaction[], columnKeys: string[]): string {
    const validColumnDefs = columnKeys.map(k => AVAILABLE_COLUMNS[k]);

    // 1. Header row
    const headerRow = validColumnDefs
      .map(col => this.escapeCell(col.header))
      .join(',');

    // 2. Data rows
    const dataRows = transactions.map(t => {
      return validColumnDefs
        .map(col => this.escapeCell(col.format(t)))
        .join(',');
    });

    // Add UTF-8 BOM for seamless Excel compatibility
    const BOM = '\uFEFF';
    return BOM + [headerRow, ...dataRows].join('\r\n');
  }

  /**
   * Formats the standard download filename
   */
  static getFilename(): string {
    const today = new Date().toISOString().split('T')[0];
    return `financial_transactions_${today}.csv`;
  }
}
