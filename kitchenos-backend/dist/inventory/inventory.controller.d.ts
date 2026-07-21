import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getDashboard(organizationId: string): Promise<{
        totalValue: number;
        lowStockItems: number;
        expiringBatches: number;
    }>;
    deductStock(body: {
        orderId: string;
        warehouseId: string;
    }): Promise<void>;
}
