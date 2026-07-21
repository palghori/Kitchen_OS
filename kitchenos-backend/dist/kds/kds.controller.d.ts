import { KdsService } from './kds.service';
export declare class KdsController {
    private readonly kdsService;
    constructor(kdsService: KdsService);
    getMetrics(kitchenId: string): Promise<{
        kitchenId: string;
        averagePrepTimeMinutes: number;
        totalOrdersToday: number;
        delayedOrders: number;
        throughputPerHour: number;
    }>;
}
