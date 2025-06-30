import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso permitido! Você está autenticado.' });
});

export default router;
