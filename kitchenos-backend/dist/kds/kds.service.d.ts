import { PrismaService } from '../prisma/prisma.service';
export declare class KdsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMetrics(kitchenId: string): Promise<{
        kitchenId: string;
        averagePrepTimeMinutes: number;
        totalOrdersToday: number;
        delayedOrders: number;
        throughputPerHour: number;
    }>;
}
