import { Router } from 'express';
import { leadController } from '../repositories/leadController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, leadController.create);
router.get('/', authMiddleware, leadController.list);

export default router;
router.put('/:id', authMiddleware, leadController.update);
router.delete('/:id', authMiddleware, leadController.delete);
