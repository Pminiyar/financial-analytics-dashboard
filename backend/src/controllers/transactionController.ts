import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionService';
import { CsvService } from '../services/csvService';
import { TransactionFilterParams } from '../types';

export class TransactionController {
  /**
   * GET /api/transactions
   */
  static async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const filters: TransactionFilterParams = {
        search: req.query.search as string,
        category: req.query.category as string,
        status: req.query.status as string,
        user: req.query.user as string,
        transactionType: req.query.transactionType as string,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        minAmount: req.query.minAmount ? parseFloat(req.query.minAmount as string) : undefined,
        maxAmount: req.query.maxAmount ? parseFloat(req.query.maxAmount as string) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10
      };

      const result = await TransactionService.getTransactions(filters);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve transactions.'
      });
    }
  }

  /**
   * GET /api/transactions/:id
   */
  static async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await TransactionService.getTransactionById(id);

      if (!transaction) {
        res.status(404).json({
          success: false,
          message: 'Transaction not found.'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: transaction
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error fetching transaction details.'
      });
    }
  }

  /**
   * GET /api/transactions/meta/users
   */
  static async getFilterUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await TransactionService.getDistinctUsers();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to load filter metadata.'
      });
    }
  }

  /**
   * POST /api/transactions/export
   */
  static async exportCsv(req: Request, res: Response): Promise<void> {
    try {
      const { columns, filters = {} } = req.body;

      const validatedColumns = CsvService.validateColumns(columns);

      const filterParams: TransactionFilterParams = {
        search: filters.search,
        category: filters.category,
        status: filters.status,
        user: filters.user,
        transactionType: filters.transactionType,
        startDate: filters.startDate,
        endDate: filters.endDate,
        minAmount: filters.minAmount !== undefined ? Number(filters.minAmount) : undefined,
        maxAmount: filters.maxAmount !== undefined ? Number(filters.maxAmount) : undefined,
        sortBy: filters.sortBy || 'date',
        sortOrder: filters.sortOrder || 'desc'
      };

      const transactions = await TransactionService.getAllMatchingTransactions(filterParams);

      const csvData = CsvService.generateCsv(transactions, validatedColumns);
      const filename = CsvService.getFilename();

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send(csvData);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Unable to generate the CSV. Please try again.'
      });
    }
  }
}
