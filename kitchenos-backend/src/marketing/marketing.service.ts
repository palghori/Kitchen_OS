import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class MarketingService {
  private readonly logger = new Logger(MarketingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async generateCampaign(organizationId: string, prompt: string, segment: string) {
    const campaignName = `${prompt.substring(0, 15)} Campaign`;
    const discountCode = `PROMO-${Math.floor(Math.random() * 10000)}`;
    const copy = `Hi there! We miss you. Use code ${discountCode} for 20% off your next order. Valid for 48 hours!`;

    const campaign = await this.prisma.marketingCampaign.create({
      data: {
        organizationId,
        name: campaignName,
        targetSegment: segment,
        channels: ['WHATSAPP', 'PUSH'],
        status: 'DRAFT',
        coupons: {
          create: {
            organizationId,
            code: discountCode,
            discountType: 'PERCENTAGE',
            discountAmount: 20
          }
        }
      }
    });

    return { campaign, suggestedCopy: copy };
  }

  async launchCampaign(campaignId: string, messageBody: string) {
    const campaign = await this.prisma.marketingCampaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign) throw new Error('Campaign not found');

    const targetCustomers = await this.prisma.customer.findMany({
      where: {
        organizationId: campaign.organizationId,
        segment: campaign.targetSegment
      }
    });

    let sentCount = 0;
    
    for (const customer of targetCustomers) {
      await this.notificationService.dispatch({
        type: 'SYSTEM',
        title: campaign.name,
        message: messageBody,
        organizationId: campaign.organizationId,
        userId: customer.id, 
        channels: campaign.channels
      });
      sentCount++;
    }

    return this.prisma.marketingCampaign.update({
      where: { id: campaignId },
      data: { status: 'ACTIVE', sentCount }
    });
  }

  async getCampaigns(organizationId: string) {
    return this.prisma.marketingCampaign.findMany({
      where: { organizationId },
      include: { coupons: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}
