import { DemandPredictionService } from './demand-prediction.service';
export declare class StaffingService {
    private readonly demandPredictor;
    constructor(demandPredictor: DemandPredictionService);
    recommendSchedule(kitchenId: string): Promise<{
        kitchenId: string;
        recommendedCooks: {
            shift: string;
            count: number;
            reason: string;
        }[];
    }>;
}
