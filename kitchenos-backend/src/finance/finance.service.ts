import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfitAndLoss(organizationId: string, startDate?: Date, endDate?: Date) {
    const dateFilter = {
      ...(startDate && { gte: startDate }),
      ...(endDate && { lte: endDate })
    };

    const orders = await this.prisma.order.findMany({
      where: {
        kitchen: { organizationId },
        status: 'DELIVERED',
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter })
      }
    });

    const grossRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const gstCollected = orders.reduce((sum, order) => sum + order.taxAmount, 0);
    const netRevenue = grossRevenue - gstCollected;

    const inventoryTransactions = await this.prisma.inventoryTransaction.findMany({
      where: {
        warehouse: { organizationId },
        type: { in: ['OUT', 'WASTE'] },
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter })
      },
      include: { batch: true }
    });

    const foodCost = inventoryTransactions.reduce((sum, tx) => {
      const qty = Math.abs(tx.quantity);
      const unitCost = tx.batch ? tx.batch.unitCost : 0;
      return sum + (qty * unitCost);
    }, 0);

    const expenses = await this.prisma.expense.findMany({
      where: {
        organizationId,
        ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
      }
    });

    let laborCost = 0;
    let otherExpenses = 0;
    const expenseBreakdown: Record<string, number> = {};

    expenses.forEach(ex => {
      if (ex.category === 'LABOR') laborCost += ex.amount;
      else otherExpenses += ex.amount;
      
      expenseBreakdown[ex.category] = (expenseBreakdown[ex.category] || 0) + ex.amount;
    });

    const totalExpenses = foodCost + laborCost + otherExpenses;
    const netProfit = netRevenue - totalExpenses;
    const profitMargin = netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0;

    return {
      period: { startDate, endDate },
      revenue: {
        gross: grossRevenue,
        gst: gstCollected,
        net: netRevenue
      },
      cogs: {
        foodCost
      },
      expenses: {
        labor: laborCost,
        other: otherExpenses,
        total: totalExpenses,
        breakdown: expenseBreakdown
      },
      profitability: {
        netProfit,
        profitMargin
      }
    };
  }

  async recordExpense(organizationId: string, data: any) {
    return this.prisma.expense.create({
      data: {
        organizationId,
        amount: data.amount,
        category: data.category,
        description: data.description,
        kitchenId: data.kitchenId,
        brandId: data.brandId,
        date: data.date ? new Date(data.date) : new Date()
      }
    });
  }
}
