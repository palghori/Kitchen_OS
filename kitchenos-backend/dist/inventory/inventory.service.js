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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = class InventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async deductStockForOrder(orderId, warehouseId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });
        if (!order)
            throw new common_1.BadRequestException('Order not found');
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
    async deductFifo(ingredientId, requiredQty, warehouseId, reference) {
        let remainingToDeduct = requiredQty;
        const batches = await this.prisma.inventoryBatch.findMany({
            where: { ingredientId, warehouseId, quantity: { gt: 0 } },
            orderBy: { expiryDate: 'asc' }
        });
        for (const batch of batches) {
            if (remainingToDeduct <= 0)
                break;
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
    async checkLowStock(ingredientId, warehouseId) {
        const ingredient = await this.prisma.ingredient.findUnique({ where: { id: ingredientId } });
        if (!ingredient || ingredient.reorderPoint <= 0)
            return;
        const totalStock = await this.prisma.inventoryBatch.aggregate({
            where: { ingredientId, warehouseId },
            _sum: { quantity: true }
        });
        if ((totalStock._sum.quantity || 0) <= ingredient.reorderPoint) {
            console.log(`ALERT: Ingredient ${ingredient.name} is low on stock (${totalStock._sum.quantity} remaining). Threshold: ${ingredient.reorderPoint}`);
        }
    }
    async getDashboardMetrics(organizationId) {
        return {
            totalValue: 12450.50,
            lowStockItems: 3,
            expiringBatches: 5,
        };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map