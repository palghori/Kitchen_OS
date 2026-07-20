import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async deductStockForOrder(orderId: string, warehouseId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });
    if (!order) throw new BadRequestException('Order not found');

    for (const orderItem of order.items) {
      const menuItem = await this.prisma.menuItem.findFirst({
        where: { name: orderItem.name },
        include: { recipe: { include: { ingredients: true } } }
      });

      if (menuItem && menuItem.recipe) {
        for (const reqIng of menuItem.recipe.ingredients) {
          await this.deductFifo(reqIng.ingredientId, reqIng.quantity * orderItem.quantity, warehouseId, `Order: ${orderId}`);
        }
      }
    }
  }

  async deductFifo(ingredientId: string, requiredQty: number, warehouseId: string, reference: string) {
    let remainingToDeduct = requiredQty;

    const batches = await this.prisma.inventoryBatch.findMany({
      where: { ingredientId, warehouseId, quantity: { gt: 0 } },
      orderBy: { expiryDate: 'asc' } // STRICT FIFO logic
    });

    for (const batch of batches) {
      if (remainingToDeduct <= 0) break;

      const deduction = Math.min(batch.quantity, remainingToDeduct);
      
      await this.prisma.inventoryBatch.update({
        where: { id: batch.id },
        data: { quantity: batch.quantity - deduction }
      });

      await this.prisma.inventoryTransaction.create({
        data: {
          type: 'OUT',
          quantity: -deduction,
          reference,
          ingredientId,
          batchId: batch.id,
          warehouseId
        }
      });

      remainingToDeduct -= deduction;
    }

    if (remainingToDeduct > 0) {
      console.warn(`WARNING: Stock out for ingredient ${ingredientId}. Short by ${remainingToDeduct}`);
    }
    
    await this.checkLowStock(ingredientId, warehouseId);
  }

  async checkLowStock(ingredientId: string, warehouseId: string) {
    const ingredient = await this.prisma.ingredient.findUnique({ where: { id: ingredientId } });
    if (!ingredient || ingredient.reorderPoint <= 0) return;

    const totalStock = await this.prisma.inventoryBatch.aggregate({
      where: { ingredientId, warehouseId },
      _sum: { quantity: true }
    });

    if ((totalStock._sum.quantity || 0) <= ingredient.reorderPoint) {
      console.log(`ALERT: Ingredient ${ingredient.name} is low on stock (${totalStock._sum.quantity} remaining). Threshold: ${ingredient.reorderPoint}`);
    }
  }

  async getDashboardMetrics(organizationId: string) {
    return {
      totalValue: 12450.50,
      lowStockItems: 3,
      expiringBatches: 5,
    };
  }
}
