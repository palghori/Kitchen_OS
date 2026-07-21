import { PrismaService } from '../prisma/prisma.service';
import { OrdersGateway } from './orders.gateway';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersService {
    private readonly prisma;
    private readonly ordersGateway;
    constructor(prisma: PrismaService, ordersGateway: OrdersGateway);
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
            orderId: string;
        }[];
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            kitchenId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        kitchenId: string;
        brandId: string;
        source: import("@prisma/client").$Enums.OrderSource;
        externalId: string | null;
        total: number;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: number;
        taxAmount: number;
        prepTimeSeconds: number | null;
        customerId: string | null;
        preparedById: string | null;
    }>;
    updateStatus(id: string, updateDto: UpdateOrderStatusDto): Promise<{
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
            orderId: string;
        }[];
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            kitchenId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        kitchenId: string;
        brandId: string;
        source: import("@prisma/client").$Enums.OrderSource;
        externalId: string | null;
        total: number;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: number;
        taxAmount: number;
        prepTimeSeconds: number | null;
        customerId: string | null;
        preparedById: string | null;
    }>;
    getActiveOrders(kitchenId: string): Promise<({
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
            orderId: string;
        }[];
        brand: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            kitchenId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        kitchenId: string;
        brandId: string;
        source: import("@prisma/client").$Enums.OrderSource;
        externalId: string | null;
        total: number;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: number;
        taxAmount: number;
        prepTimeSeconds: number | null;
        customerId: string | null;
        preparedById: string | null;
    })[]>;
}
