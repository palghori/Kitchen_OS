import { PrismaService } from '../prisma/prisma.service';
export declare class CrmService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processOrder(orderId: string, customerId: string): Promise<{
        success: boolean;
        pointsEarned: number;
    }>;
    evaluateSegmentation(customerId: string): Promise<void>;
    getCustomer360(customerId: string): Promise<({
        orders: {
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
        }[];
        feedbacks: {
            id: string;
            organizationId: string;
            createdAt: Date;
            customerId: string;
            orderId: string;
            rating: number;
            review: string | null;
        }[];
    } & {
        id: string;
        email: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        lifetimeValue: number;
        loyaltyPoints: number;
        walletBalance: number;
        segment: string;
    }) | null>;
    getCustomers(organizationId: string): Promise<{
        id: string;
        email: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        lifetimeValue: number;
        loyaltyPoints: number;
        walletBalance: number;
        segment: string;
    }[]>;
}
