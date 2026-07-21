import { ProcurementService } from './procurement.service';
export declare class ProcurementController {
    private readonly procurementService;
    constructor(procurementService: ProcurementService);
    createPO(body: any): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PurchaseOrderStatus;
        supplierId: string;
        totalAmount: number;
        expectedDate: Date | null;
    }>;
    receiveGoods(body: any): Promise<{
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
    getRecommendations(organizationId: string): Promise<{
        ingredient: any;
        currentStock: any;
        reorderPoint: any;
        recommendedOrderQuantity: number;
        preferredSupplier: any;
        estimatedUnitCost: any;
    }[]>;
}
