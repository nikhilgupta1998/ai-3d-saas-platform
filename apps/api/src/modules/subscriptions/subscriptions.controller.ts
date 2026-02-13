import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsEnum } from 'class-validator';

enum SubscriptionTier {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

class UpgradeTierDto {
  @IsEnum(SubscriptionTier)
  tier: SubscriptionTier;
}

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('current')
  async getCurrent(@Request() req) {
    return this.subscriptionsService.getSubscription(req.user.userId);
  }

  @Post('upgrade')
  async upgrade(@Request() req, @Body() upgradeTierDto: UpgradeTierDto) {
    return this.subscriptionsService.upgradeTier(req.user.userId, upgradeTierDto.tier);
  }

  @Post('checkout')
  async createCheckout(@Request() req, @Body() upgradeTierDto: UpgradeTierDto) {
    return this.subscriptionsService.createCheckoutSession(req.user.userId, upgradeTierDto.tier);
  }

  @Post('webhook')
  async handleWebhook(@Body() event: any) {
    return this.subscriptionsService.handleWebhook(event);
  }
}
