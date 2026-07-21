import { PrismaService } from '../prisma/prisma.service';
export declare class ProcurementService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPO(organizationId: string, supplierId: string, expectedDate: string, items: {
        ingredientId: string;
        quantity: number;
        unitCost: number;
    }[]): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PurchaseOrderStatus;
        supplierId: string;
        totalAmount: number;
        expectedDate: Date | null;
    }>;
    receiveGoods(organizationId: string, purchaseOrderId: string, warehouseId: string, receivedItems: {
        ingredientId: string;
        quantityReceived: number;
        quantityDamaged: number;
        batchExpiry?: string;
    }[]): Promise<{
        items: {
            id: string;
            ingredientId: string;
            quantityReceived: number;
            quantityDamaged: number;
            grnId: string;
        }[];
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        receivedDate: Date;
        notes: string | null;
        purchaseOrderId: string;
    }>;
    getPurchaseRecommendations(organizationId: string): Promise<{
        ingredient: any;
        currentStock: any;
        reorderPoint: any;
        recommendedOrderQuantity: number;
        preferredSupplier: any;
        estimatedUnitCost: any;
    }[]>;
}
