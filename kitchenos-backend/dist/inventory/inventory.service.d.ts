import { PrismaService } from '../prisma/prisma.service';
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deductStockForOrder(orderId: string, warehouseId: string): Promise<void>;
    deductFifo(ingredientId: string, requiredQty: number, warehouseId: string, reference: string): Promise<void>;
    checkLowStock(ingredientId: string, warehouseId: string): Promise<void>;
    getDashboardMetrics(organizationId: string): Promise<{
        totalValue: number;
        lowStockItems: number;
        expiringBatches: number;
    }>;
}
