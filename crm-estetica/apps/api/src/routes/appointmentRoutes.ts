import { Router } from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, appointmentController.create);
router.get('/', authMiddleware, appointmentController.list);
router.put('/:id', authMiddleware, appointmentController.update);
router.delete('/:id', authMiddleware, appointmentController.delete);
router.get('/today', authMiddleware, appointmentController.listToday);
router.get('/upcoming', authMiddleware, appointmentController.listUpcoming);

export default router;
router.get('/week', authMiddleware, appointmentController.listWeek);
router.get('/next', authMiddleware, appointmentController.next);
