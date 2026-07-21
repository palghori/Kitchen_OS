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
exports.ProcurementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProcurementService = class ProcurementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPO(organizationId, supplierId, expectedDate, items) {
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
    async receiveGoods(organizationId, purchaseOrderId, warehouseId, receivedItems) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id: purchaseOrderId },
            include: { items: true }
        });
        if (!po)
            throw new Error('Purchase Order not found');
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
            if (!poItem)
                continue;
            const netUsable = rItem.quantityReceived - rItem.quantityDamaged;
            invoiceAmount += (rItem.quantityReceived * poItem.unitCost);
            if (netUsable > 0) {
                const batch = await this.prisma.inventoryBatch.create({
                    data: {
                        batchNumber: `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        warehouseId,
                        ingredientId: rItem.ingredientId,
                        supplierId: po.supplierId,
                        quantity: netUsable,
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
    async getPurchaseRecommendations(organizationId) {
        const ingredients = await this.prisma.ingredient.findMany({
            where: { organizationId },
            include: {
                batches: { where: { quantity: { gt: 0 } } },
                priceHistory: { orderBy: { date: 'desc' }, take: 1, include: { supplier: true } }
            }
        });
        const recommendations = [];
        for (const ing of ingredients) {
            const totalStock = ing.batches.reduce((sum, b) => sum + b.quantity, 0);
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
};
exports.ProcurementService = ProcurementService;
exports.ProcurementService = ProcurementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProcurementService);
//# sourceMappingURL=procurement.service.js.map