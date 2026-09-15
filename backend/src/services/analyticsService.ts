import { Transaction } from '../models/Transaction';
import { AnalyticsSummary, AnalyticsTrendItem, AnalyticsCategoryItem } from '../types';

export class AnalyticsService {
  /**
   * Calculates overall summary metrics:
   * totalRevenue, totalExpenses, netBalance, transactionCount
   */
  static async getSummary(): Promise<AnalyticsSummary> {
    const [result] = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $cond: [{ $eq: ['$transaction_type', 'Revenue'] }, '$amount', 0]
            }
          },
          totalExpenses: {
            $sum: {
              $cond: [{ $eq: ['$transaction_type', 'Expense'] }, '$amount', 0]
            }
          },
          transactionCount: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = result ? Math.round(result.totalRevenue * 100) / 100 : 0;
    const totalExpenses = result ? Math.round(result.totalExpenses * 100) / 100 : 0;
    const netBalance = Math.round((totalRevenue - totalExpenses) * 100) / 100;
    const transactionCount = result ? result.transactionCount : 0;

    return {
      totalRevenue,
      totalExpenses,
      netBalance,
      transactionCount
    };
  }

  /**
   * Generates chronological monthly trends for Revenue vs Expenses
   */
  static async getTrends(): Promise<AnalyticsTrendItem[]> {
    // Group by Year-Month (e.g. "2026-03" -> "Mar 2026")
    const trends = await Transaction.aggregate([
      {
        $project: {
          yearMonth: { $substrCP: ['$date', 0, 7] }, // "YYYY-MM"
          amount: 1,
          transaction_type: 1
        }
      },
      {
        $group: {
          _id: '$yearMonth',
          revenue: {
            $sum: {
              $cond: [{ $eq: ['$transaction_type', 'Revenue'] }, '$amount', 0]
            }
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$transaction_type', 'Expense'] }, '$amount', 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return trends.map(t => {
      let periodLabel = t._id;
      if (t._id && t._id.includes('-')) {
        const [year, month] = t._id.split('-');
        const monthIdx = parseInt(month, 10) - 1;
        if (monthIdx >= 0 && monthIdx < 12) {
          periodLabel = `${monthNames[monthIdx]} ${year.slice(2)}`;
        }
      }

      return {
        period: periodLabel,
        revenue: Math.round(t.revenue * 100) / 100,
        expenses: Math.round(t.expenses * 100) / 100
      };
    });
  }

  /**
   * Generates category breakdowns for charts
   */
  static async getCategories(): Promise<AnalyticsCategoryItem[]> {
    const categories = await Transaction.aggregate([
      {
        $group: {
          _id: { category: '$category', type: '$transaction_type' },
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { amount: -1 } }
    ]);

    const totalAmount = categories.reduce((sum, c) => sum + c.amount, 0);

    return categories.map(c => ({
      category: c._id.category,
      type: c._id.type,
      amount: Math.round(c.amount * 100) / 100,
      count: c.count,
      percentage: totalAmount > 0 ? Math.round((c.amount / totalAmount) * 1000) / 10 : 0
    }));
  }
}
