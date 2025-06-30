import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, dashboardController.summary);

export default router;
