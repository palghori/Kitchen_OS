import { PrismaService } from '../prisma/prisma.service';
export declare class FinanceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfitAndLoss(organizationId: string, startDate?: Date, endDate?: Date): Promise<{
        period: {
            startDate: Date | undefined;
            endDate: Date | undefined;
        };
        revenue: {
            gross: number;
            gst: number;
            net: number;
        };
        cogs: {
            foodCost: number;
        };
        expenses: {
            labor: number;
            other: number;
            total: number;
            breakdown: Record<string, number>;
        };
        profitability: {
            netProfit: number;
            profitMargin: number;
        };
    }>;
    recordExpense(organizationId: string, data: any): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        kitchenId: string | null;
        brandId: string | null;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        amount: number;
        date: Date;
    }>;
}
