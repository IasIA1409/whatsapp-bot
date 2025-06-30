import { Request, Response } from 'express';
import { leadRepository } from '../repositories/leadRepository';
import { AuthRequest } from '../middlewares/authMiddleware';

export const leadController = {
  async create(req: AuthRequest, res: Response) {
    const { name, phone, origin } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

    try {
      const lead = await leadRepository.create(userId, { name, phone, origin });
      return res.status(201).json(lead);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

    try {
      const leads = await leadRepository.findAllByUser(userId);
      return res.json(leads);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const leadId = Number(req.params.id);
    const { name, phone, origin } = req.body;

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const result = await leadRepository.updateById(userId, leadId, { name, phone, origin });

    if (result.count === 0) {
      return res.status(404).json({ error: 'Lead não encontrado ou não pertence a você' });
    }

    return res.json({ message: 'Lead atualizado com sucesso' });
  },

  async delete(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const leadId = Number(req.params.id);

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const result = await leadRepository.deleteById(userId, leadId);

    if (result.count === 0) {
      return res.status(404).json({ error: 'Lead não encontrado ou não pertence a você' });
    }

    return res.json({ message: 'Lead excluído com sucesso' });
  }
};
