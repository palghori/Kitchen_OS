import { DemandPredictionService } from './demand-prediction.service';
import { InventoryOptimizationService } from './inventory-optimization.service';
import { StaffingService } from './staffing.service';
import { NaturalLanguageInsightService } from './natural-language-insight.service';
export declare class AiController {
    private readonly demandService;
    private readonly inventoryService;
    private readonly staffingService;
    private readonly insightService;
    constructor(demandService: DemandPredictionService, inventoryService: InventoryOptimizationService, staffingService: StaffingService, insightService: NaturalLanguageInsightService);
    getDemand(kitchenId: string): Promise<{
        kitchenId: string;
        forecast: {
            time: string;
            predictedOrders: number;
            confidence: number;
        }[];
        insight: string;
    }>;
    getInventoryParLevels(kitchenId: string): Promise<{
        recommendations: {
            ingredient: string;
            currentStock: number;
            recommendedPar: number;
            action: string;
        }[];
        reasoning: string;
    }>;
    getStaffing(kitchenId: string): Promise<{
        kitchenId: string;
        recommendedCooks: {
            shift: string;
            count: number;
            reason: string;
        }[];
    }>;
    askQuestion(body: {
        query: string;
        kitchenId: string;
    }): Promise<{
        query: string;
        answer: string;
        confidence: number;
    }>;
}
