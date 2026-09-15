import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all analytics routes
router.use(authenticateToken);

router.get('/summary', AnalyticsController.getSummary);
router.get('/trends', AnalyticsController.getTrends);
router.get('/categories', AnalyticsController.getCategories);

export default router;
