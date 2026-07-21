import { CrmService } from './crm.service';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
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
    getCustomer360(id: string): Promise<({
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            kitchenId: string;
            brandId: string;
            source: import("@prisma/client").$Enums.OrderSource;
            externalId: string | null;
            total: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
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
    processOrder(body: {
        orderId: string;
        customerId: string;
    }): Promise<{
        success: boolean;
        pointsEarned: number;
    }>;
}
