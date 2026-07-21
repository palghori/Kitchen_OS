import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getExecutiveSummary(organizationId: string): Promise<{
        kpis: {
            totalRevenue: number;
            totalOrders: number;
            activeBrands: number;
            totalEmployees: number;
            avgPrepTime: string;
        };
        peakHours: {
            hour: string;
            orders: number;
        }[];
        brandPerformance: {
            name: string;
            revenue: number;
        }[];
        revenueTrend: {
            date: string;
            revenue: number;
            profit: number;
        }[];
    }>;
}
