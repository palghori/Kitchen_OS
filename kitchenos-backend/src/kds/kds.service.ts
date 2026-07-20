import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KdsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics(kitchenId: string) {
    return {
      kitchenId,
      averagePrepTimeMinutes: 8.5,
      totalOrdersToday: 245,
      delayedOrders: 12,
      throughputPerHour: 35,
    };
  }
}
