import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
