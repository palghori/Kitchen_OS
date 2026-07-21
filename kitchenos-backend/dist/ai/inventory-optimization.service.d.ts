import { DemandPredictionService } from './demand-prediction.service';
export declare class InventoryOptimizationService {
    private readonly demandPredictor;
    constructor(demandPredictor: DemandPredictionService);
    recommendParLevels(kitchenId: string): Promise<{
        recommendations: {
            ingredient: string;
            currentStock: number;
            recommendedPar: number;
            action: string;
        }[];
        reasoning: string;
    }>;
}
