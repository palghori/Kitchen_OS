import { PrismaService } from '../prisma/prisma.service';
export declare class DemandPredictionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    forecastDemand(kitchenId: string, hoursAhead?: number): Promise<{
        kitchenId: string;
        forecast: {
            time: string;
            predictedOrders: number;
            confidence: number;
        }[];
        insight: string;
    }>;
}
