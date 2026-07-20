import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProcurementService {
  constructor(private readonly prisma: PrismaService) {}

  async createPO(organizationId: string, supplierId: string, expectedDate: string, items: { ingredientId: string; quantity: number; unitCost: number }[]) {
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

    return this.prisma.purchaseOrder.create({
      data: {
        organizationId,
        supplierId,
        totalAmount,
        expectedDate: new Date(expectedDate),
        status: 'ISSUED',
        items: {
          create: items.map(item => ({
            ingredientId: item.ingredientId,
            quantityOrdered: item.quantity,
            unitCost: item.unitCost
          }))
        }
      }
    });
  }

  async receiveGoods(organizationId: string, purchaseOrderId: string, warehouseId: string, receivedItems: { ingredientId: string; quantityReceived: number; quantityDamaged: number; batchExpiry?: string }[]) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id: purchaseOrderId },
      include: { items: true }
    });

    if (!po) throw new Error('Purchase Order not found');

    const grn = await this.prisma.goodsReceivedNote.create({
      data: {
        organizationId,
        purchaseOrderId,
        items: {
          create: receivedItems.map(item => ({
            ingredientId: item.ingredientId,
            quantityReceived: item.quantityReceived,
            quantityDamaged: item.quantityDamaged
          }))
        }
      },
      include: { items: true }
    });

    await this.prisma.purchaseOrder.update({
      where: { id: purchaseOrderId },
      data: { status: 'FULFILLED' }
    });

    let invoiceAmount = 0;
    
    for (const rItem of receivedItems) {
      const poItem = po.items.find(i => i.ingredientId === rItem.ingredientId);
      if (!poItem) continue;

      const netUsable = rItem.quantityReceived - rItem.quantityDamaged;
      invoiceAmount += (rItem.quantityReceived * poItem.unitCost);

      if (netUsable > 0) {
        const batch = await this.prisma.inventoryBatch.create({
          data: {
            ingredientId: rItem.ingredientId,
            supplierId: po.supplierId,
            quantityReceived: netUsable,
            quantityRemaining: netUsable,
            unitCost: poItem.unitCost,
            expiryDate: rItem.batchExpiry ? new Date(rItem.batchExpiry) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        });

        await this.prisma.inventoryTransaction.create({
          data: {
            type: 'IN',
            quantity: netUsable,
            ingredientId: rItem.ingredientId,
            warehouseId,
            batchId: batch.id
          }
        });
      }

      await this.prisma.priceHistory.create({
        data: {
          unitCost: poItem.unitCost,
          ingredientId: rItem.ingredientId,
          supplierId: po.supplierId
        }
      });
    }

    await this.prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${Date.now()}`,
        amountDue: invoiceAmount,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
        supplierId: po.supplierId,
        grnId: grn.id,
        organizationId
      }
    });

    return grn;
  }

  async getPurchaseRecommendations(organizationId: string) {
    const ingredients = await this.prisma.ingredient.findMany({
      where: { organizationId },
      include: {
        batches: { where: { quantityRemaining: { gt: 0 } } },
        priceHistory: { orderBy: { date: 'desc' }, take: 1, include: { supplier: true } }
      }
    });

    const recommendations = [];

    for (const ing of ingredients) {
      const totalStock = ing.batches.reduce((sum, b) => sum + b.quantityRemaining, 0);
      
      if (totalStock <= ing.reorderPoint) {
        const lastPrice = ing.priceHistory[0];
        recommendations.push({
          ingredient: ing.name,
          currentStock: totalStock,
          reorderPoint: ing.reorderPoint,
          recommendedOrderQuantity: (ing.reorderPoint * 2) - totalStock,
          preferredSupplier: lastPrice?.supplier?.name || 'Unknown',
          estimatedUnitCost: lastPrice?.unitCost || 0
        });
      }
    }

    return recommendations;
  }
}
