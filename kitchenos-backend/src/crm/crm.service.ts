import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private readonly prisma: PrismaService) {}

  async processOrder(orderId: string, customerId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) throw new Error('Order not found');

    const orderAmount = order.total;
    const pointsEarned = Math.floor(orderAmount);

    await this.prisma.customer.update({
      where: { id: customerId },
      data: {
        lifetimeValue: { increment: orderAmount },
        loyaltyPoints: { increment: pointsEarned }
      }
    });

    await this.evaluateSegmentation(customerId);

    return { success: true, pointsEarned };
  }

  async evaluateSegmentation(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: { orders: { orderBy: { createdAt: 'desc' } } }
    });

    if (!customer) return;

    let segment = 'NEW';
    const orderCount = customer.orders.length;
    
    if (orderCount > 10 && customer.lifetimeValue > 500) {
      segment = 'VIP';
    } else if (orderCount > 3) {
      segment = 'REGULAR';
    }

    if (orderCount > 0) {
      const lastOrder = customer.orders[0];
      const daysSinceLastOrder = (Date.now() - lastOrder.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastOrder > 30) {
        segment = 'AT_RISK';
      }
    }

    if (customer.segment !== segment) {
      await this.prisma.customer.update({
        where: { id: customerId },
        data: { segment }
      });
    }
  }

  async getCustomer360(customerId: string) {
    return this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        orders: { orderBy: { createdAt: 'desc' }, take: 5 },
        feedbacks: true
      }
    });
  }

  async getCustomers(organizationId: string) {
    return this.prisma.customer.findMany({
      where: { organizationId },
      orderBy: { lifetimeValue: 'desc' }
    });
  }
}
