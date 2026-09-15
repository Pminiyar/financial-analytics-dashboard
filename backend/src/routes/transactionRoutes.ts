import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all transaction routes
router.use(authenticateToken);

router.get('/', TransactionController.getTransactions);
router.get('/meta/users', TransactionController.getFilterUsers);
router.post('/export', TransactionController.exportCsv);
router.get('/:id', TransactionController.getTransactionById);

export default router;
