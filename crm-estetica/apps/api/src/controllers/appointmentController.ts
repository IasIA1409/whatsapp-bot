import { Request, Response } from 'express';
import { appointmentRepository } from '../repositories/appointmentRepository';
import { leadRepository } from '../repositories/leadRepository';
import { AuthRequest } from '../middlewares/authMiddleware';

export const appointmentController = {
  async create(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const { leadId, date, notes } = req.body;

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const lead = await leadRepository.findById(leadId);
    if (!lead || lead.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para agendar com este lead' });
    }

    try {
      const appointment = await appointmentRepository.create(userId, leadId, new Date(date), notes);
      return res.status(201).json(appointment);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    try {
      const appointments = await appointmentRepository.findAllByUser(userId);
      return res.json(appointments);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const appointmentId = Number(req.params.id);
    const { date, notes } = req.body;

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const result = await appointmentRepository.updateById(userId, appointmentId, {
      date: date ? new Date(date) : undefined,
      notes,
    });

    if (result.count === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado ou não é seu' });
    }

    return res.json({ message: 'Agendamento atualizado com sucesso' });
  },

  async delete(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const appointmentId = Number(req.params.id);

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const result = await appointmentRepository.deleteById(userId, appointmentId);

    if (result.count === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado ou não é seu' });
    }

    return res.json({ message: 'Agendamento excluído com sucesso' });
  },

  async listToday(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    try {
      const appointments = await appointmentRepository.findTodayByUser(userId);
      return res.json(appointments);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async listUpcoming(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    try {
      const appointments = await appointmentRepository.findUpcomingByUser(userId);
      return res.json(appointments);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async listWeek(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    try {
      const appointments = await appointmentRepository.findWeekByUser(userId);
      return res.json(appointments);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async next(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    try {
      const appointment = await appointmentRepository.findNextByUser(userId);
      return res.json(appointment || {});
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
};
