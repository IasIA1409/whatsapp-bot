import { PrismaClient } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export const appointmentRepository = {
  async create(userId: number, leadId: number, date: Date, notes?: string) {
    return prisma.appointment.create({
      data: {
        userId,
        leadId,
        date,
        notes,
      },
    });
  },

  async findAllByUser(userId: number) {
    return prisma.appointment.findMany({
      where: { userId },
      include: { lead: true },
      orderBy: { date: 'asc' },
    });
  },

  async updateById(userId: number, appointmentId: number, data: { date?: Date; notes?: string }) {
    return prisma.appointment.updateMany({
      where: {
        id: appointmentId,
        userId,
      },
      data,
    });
  },

  async deleteById(userId: number, appointmentId: number) {
    return prisma.appointment.deleteMany({
      where: {
        id: appointmentId,
        userId,
      },
    });
  },

  async findTodayByUser(userId: number) {
    const today = new Date();
    return prisma.appointment.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
      include: { lead: true },
      orderBy: { date: 'asc' },
    });
  },

  async findUpcomingByUser(userId: number) {
    const now = new Date();
    return prisma.appointment.findMany({
      where: {
        userId,
        date: {
          gt: now,
        },
      },
      include: { lead: true },
      orderBy: { date: 'asc' },
    });
  },

  async findWeekByUser(userId: number) {
    const today = new Date();
    return prisma.appointment.findMany({
      where: {
        userId,
        date: {
          gte: startOfWeek(today, { weekStartsOn: 1 }), // Segunda
          lte: endOfWeek(today, { weekStartsOn: 1 })    // Domingo
        },
      },
      include: { lead: true },
      orderBy: { date: 'asc' },
    });
  },

  async findNextByUser(userId: number) {
    const now = new Date();
    return prisma.appointment.findFirst({
      where: {
        userId,
        date: { gt: now }
      },
      include: { lead: true },
      orderBy: { date: 'asc' }
    });
  }
};

import { startOfWeek, endOfWeek } from 'date-fns';

