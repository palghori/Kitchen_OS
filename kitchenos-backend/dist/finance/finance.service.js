"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanceService = class FinanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfitAndLoss(organizationId, startDate, endDate) {
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
        const expenseBreakdown = {};
        expenses.forEach(ex => {
            if (ex.category === 'LABOR')
                laborCost += ex.amount;
            else
                otherExpenses += ex.amount;
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
    async recordExpense(organizationId, data) {
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
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map