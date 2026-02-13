import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
      },
    });

    if (user) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateCredits(userId: string, credits: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { credits },
    });
  }

  async deductCredits(userId: string, amount: number) {
    const user = await this.findOne(userId);
    if (!user || user.credits < amount) {
      throw new Error('Insufficient credits');
    }

    return this.updateCredits(userId, user.credits - amount);
  }
}
