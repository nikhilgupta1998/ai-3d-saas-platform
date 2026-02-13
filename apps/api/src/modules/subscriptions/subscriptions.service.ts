import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getSubscription(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
    });
  }

  async upgradeTier(userId: string, tier: string) {
    const creditsPerMonth = this.getCreditsForTier(tier);
    
    return this.prisma.subscription.update({
      where: { userId },
      data: {
        tier: tier as any,
        creditsPerMonth,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async createCheckoutSession(userId: string, tier: string) {
    // This would integrate with Stripe
    // For now, return a mock session
    return {
      sessionId: 'mock-session-id',
      url: 'https://checkout.stripe.com/mock',
    };
  }

  async handleWebhook(event: any) {
    // Handle Stripe webhook events
    // Update subscription status, credits, etc.
    return { received: true };
  }

  private getCreditsForTier(tier: string): number {
    const creditMap: Record<string, number> = {
      FREE: 100,
      STARTER: 500,
      PRO: 2000,
      ENTERPRISE: 10000,
    };
    return creditMap[tier] || 100;
  }
}
