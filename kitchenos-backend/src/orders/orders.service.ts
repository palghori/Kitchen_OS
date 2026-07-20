import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersGateway } from './orders.gateway';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersGateway: OrdersGateway,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        kitchenId: createOrderDto.kitchenId,
        brandId: createOrderDto.brandId,
        source: createOrderDto.source || 'MANUAL',
        externalId: createOrderDto.externalId,
        total: createOrderDto.total,
        metadata: createOrderDto.metadata || {},
        items: {
          create: createOrderDto.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true, brand: true }
    });

    this.ordersGateway.emitOrderCreated(order);
    return order;
  }

  async updateStatus(id: string, updateDto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    const updated = await this.prisma.order.update({
      where: { id },
      data: { status: updateDto.status },
      include: { items: true, brand: true }
    });

    this.ordersGateway.emitOrderStatusUpdated(id, updateDto.status, updated);
    return updated;
  }

  async getActiveOrders(kitchenId: string) {
    return this.prisma.order.findMany({
      where: {
        kitchenId,
        status: {
          notIn: ['DELIVERED', 'CANCELLED', 'REJECTED']
        }
      },
      include: { items: true, brand: true },
      orderBy: { createdAt: 'asc' }
    });
  }
}
