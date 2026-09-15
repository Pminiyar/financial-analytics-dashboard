import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';

export class AnalyticsController {
  /**
   * GET /api/analytics/summary
   */
  static async getSummary(req: Request, res: Response): Promise<void> {
    try {
      const summary = await AnalyticsService.getSummary();
      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to calculate analytics summary.'
      });
    }
  }

  /**
   * GET /api/analytics/trends
   */
  static async getTrends(req: Request, res: Response): Promise<void> {
    try {
      const trends = await AnalyticsService.getTrends();
      res.status(200).json({
        success: true,
        data: trends
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate financial trends.'
      });
    }
  }

  /**
   * GET /api/analytics/categories
   */
  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await AnalyticsService.getCategories();
      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to calculate category distribution.'
      });
    }
  }
}
