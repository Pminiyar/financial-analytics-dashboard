import mongoose from 'mongoose';
import { Transaction, ITransactionDocument } from '../models/Transaction';
import { TransactionFilterParams, PaginatedResponse, PaginationMeta } from '../types';

export class TransactionService {
  /**
   * Constructs a MongoDB filter object from request parameters
   */
  private static buildFilterQuery(params: TransactionFilterParams): Record<string, any> {
    const query: Record<string, any> = {};

    // Search across relevant fields: ID, description, category, status, user_id, user_profile
    if (params.search && params.search.trim() !== '') {
      const searchRegex = new RegExp(params.search.trim(), 'i');
      const orConditions: any[] = [
        { description: searchRegex },
        { category: searchRegex },
        { status: searchRegex },
        { user_profile: searchRegex },
        { user_id: searchRegex }
      ];

      // Check if search might be an exact MongoDB _id
      if (mongoose.Types.ObjectId.isValid(params.search.trim())) {
        orConditions.push({ _id: new mongoose.Types.ObjectId(params.search.trim()) });
      }

      query.$or = orConditions;
    }

    // Category filter
    if (params.category && params.category.toLowerCase() !== 'all') {
      query.category = params.category;
    }

    // Status filter
    if (params.status && params.status.toLowerCase() !== 'all') {
      query.status = params.status;
    }

    // User / User profile filter
    if (params.user && params.user.toLowerCase() !== 'all') {
      query.$or = query.$or || [];
      query.$or.push(
        { user_id: params.user },
        { user_profile: params.user }
      );
    }

    // Transaction Type filter (Revenue / Expense)
    if (params.transactionType && params.transactionType.toLowerCase() !== 'all') {
      query.transaction_type = params.transactionType;
    }

    // Date range filter
    if (params.startDate || params.endDate) {
      query.date = {};
      if (params.startDate) {
        query.date.$gte = params.startDate;
      }
      if (params.endDate) {
        query.date.$lte = params.endDate;
      }
    }

    // Amount range filter
    if (params.minAmount !== undefined || params.maxAmount !== undefined) {
      query.amount = {};
      if (params.minAmount !== undefined && !isNaN(params.minAmount)) {
        query.amount.$gte = Number(params.minAmount);
      }
      if (params.maxAmount !== undefined && !isNaN(params.maxAmount)) {
        query.amount.$lte = Number(params.maxAmount);
      }
    }

    return query;
  }

  /**
   * Retrieves paginated, sorted, and filtered transactions
   */
  static async getTransactions(params: TransactionFilterParams) {
    const query = this.buildFilterQuery(params);
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 10));
    const skip = (page - 1) * limit;

    // Sorting logic
    const sort: Record<string, 1 | -1> = {};
    const sortField = params.sortBy || 'date';
    const sortDirection = params.sortOrder === 'asc' ? 1 : -1;

    switch (sortField) {
      case 'amount':
        sort.amount = sortDirection;
        break;
      case 'category':
        sort.category = sortDirection;
        break;
      case 'status':
        sort.status = sortDirection;
        break;
      case 'user':
        sort.user_profile = sortDirection;
        break;
      case 'date':
      default:
        sort.date = sortDirection;
        sort._id = sortDirection; // secondary stable sort
        break;
    }

    const [total, transactions] = await Promise.all([
      Transaction.countDocuments(query),
      Transaction.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const transformedTransactions = transactions.map((t: any) => ({
      id: t._id.toString(),
      date: t.date,
      amount: t.amount,
      category: t.category,
      status: t.status,
      user_id: t.user_id,
      user_profile: t.user_profile,
      transaction_type: t.transaction_type,
      description: t.description,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      transactions: transformedTransactions,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  /**
   * Fetches single transaction by ID
   */
  static async getTransactionById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const transaction = await Transaction.findById(id).lean();
    if (!transaction) return null;

    return {
      id: (transaction as any)._id.toString(),
      date: (transaction as any).date,
      amount: (transaction as any).amount,
      category: (transaction as any).category,
      status: (transaction as any).status,
      user_id: (transaction as any).user_id,
      user_profile: (transaction as any).user_profile,
      transaction_type: (transaction as any).transaction_type,
      description: (transaction as any).description,
      createdAt: (transaction as any).createdAt,
      updatedAt: (transaction as any).updatedAt
    };
  }

  /**
   * Fetches all matching transactions for CSV export (no pagination limit)
   */
  static async getAllMatchingTransactions(params: TransactionFilterParams) {
    const query = this.buildFilterQuery(params);

    const sort: Record<string, 1 | -1> = {};
    const sortField = params.sortBy || 'date';
    const sortDirection = params.sortOrder === 'asc' ? 1 : -1;
    sort[sortField === 'user' ? 'user_profile' : sortField] = sortDirection;

    const transactions = await Transaction.find(query).sort(sort).lean();

    return transactions.map((t: any) => ({
      id: t._id.toString(),
      date: t.date,
      amount: t.amount,
      category: t.category,
      status: t.status,
      user_id: t.user_id,
      user_profile: t.user_profile,
      transaction_type: t.transaction_type,
      description: t.description,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));
  }

  /**
   * Gets distinct users and profiles for filters
   */
  static async getDistinctUsers() {
    const users = await Transaction.aggregate([
      {
        $group: {
          _id: '$user_id',
          user_id: { $first: '$user_id' },
          user_profile: { $first: '$user_profile' }
        }
      },
      { $sort: { user_profile: 1 } }
    ]);
    return users.map(u => ({
      userId: u.user_id,
      userProfile: u.user_profile
    }));
  }
}
