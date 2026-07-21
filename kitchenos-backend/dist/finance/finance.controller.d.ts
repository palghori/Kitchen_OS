import { FinanceService } from './finance.service';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    getProfitAndLoss(organizationId: string, startDate?: string, endDate?: string): Promise<{
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
    recordExpense(body: any): Promise<{
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
