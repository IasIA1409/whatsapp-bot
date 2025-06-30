import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userRepository = {
  async create({ name, email, password }: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Nunca retorne a senha!
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
