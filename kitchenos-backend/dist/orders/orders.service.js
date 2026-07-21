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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const orders_gateway_1 = require("./orders.gateway");
let OrdersService = class OrdersService {
    prisma;
    ordersGateway;
    constructor(prisma, ordersGateway) {
        this.prisma = prisma;
        this.ordersGateway = ordersGateway;
    }
    async createOrder(createOrderDto) {
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
    async updateStatus(id, updateDto) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const updated = await this.prisma.order.update({
            where: { id },
            data: { status: updateDto.status },
            include: { items: true, brand: true }
        });
        this.ordersGateway.emitOrderStatusUpdated(id, updateDto.status, updated);
        return updated;
    }
    async getActiveOrders(kitchenId) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        orders_gateway_1.OrdersGateway])
], OrdersService);
//# sourceMappingURL=orders.service.js.map