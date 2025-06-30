import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';
import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export const dashboardController = {
  async summary(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });

    const [leadCount, appointmentsToday, appointmentsUpcoming] = await Promise.all([
      prisma.lead.count({ where: { userId } }),
      prisma.appointment.count({
        where: {
          userId,
          date: {
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date())
          }
        }
      }),
      prisma.appointment.count({
        where: {
          userId,
          date: {
            gt: new Date()
          }
        }
      })
    ]);

    return res.json({
      totalLeads: leadCount,
      todayAppointments: appointmentsToday,
      upcomingAppointments: appointmentsUpcoming
    });
  }
};
