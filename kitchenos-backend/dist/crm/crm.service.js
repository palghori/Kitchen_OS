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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CrmService = class CrmService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processOrder(orderId, customerId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });
        if (!order)
            throw new Error('Order not found');
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
    async evaluateSegmentation(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
            include: { orders: { orderBy: { createdAt: 'desc' } } }
        });
        if (!customer)
            return;
        let segment = 'NEW';
        const orderCount = customer.orders.length;
        if (orderCount > 10 && customer.lifetimeValue > 500) {
            segment = 'VIP';
        }
        else if (orderCount > 3) {
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
    async getCustomer360(customerId) {
        return this.prisma.customer.findUnique({
            where: { id: customerId },
            include: {
                orders: { orderBy: { createdAt: 'desc' }, take: 5 },
                feedbacks: true
            }
        });
    }
    async getCustomers(organizationId) {
        return this.prisma.customer.findMany({
            where: { organizationId },
            orderBy: { lifetimeValue: 'desc' }
        });
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrmService);
//# sourceMappingURL=crm.service.js.map