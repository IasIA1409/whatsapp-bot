import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const leadRepository = {
  async create(userId: number, data: { name: string; phone: string; origin: string }) {
    return prisma.lead.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async findAllByUser(userId: number) {
    return prisma.lead.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async updateById(userId: number, leadId: number, data: { name?: string; phone?: string; origin?: string }) {
    return prisma.lead.updateMany({
      where: { id: leadId, userId },
      data,
    });
  },

  async deleteById(userId: number, leadId: number) {
    return prisma.lead.deleteMany({
      where: { id: leadId, userId },
    });
  },

  async findById(leadId: number) {
    return prisma.lead.findUnique({
      where: { id: leadId },
    });
  }
};
