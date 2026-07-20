import { Injectable } from '@nestjs/common';
import { DemandPredictionService } from './demand-prediction.service';

@Injectable()
export class InventoryOptimizationService {
  constructor(private readonly demandPredictor: DemandPredictionService) {}

  async recommendParLevels(kitchenId: string) {
    // 1. Fetch predicted demand
    const demand = await this.demandPredictor.forecastDemand(kitchenId);
    
    // 2. Map predicted items to ingredients (Mocked logic)
    // In production, this would use a recipe management DB to calculate exact ingredient weights.
    
    return {
      recommendations: [
        { ingredient: 'Burger Buns', currentStock: 50, recommendedPar: 150, action: 'ORDER' },
        { ingredient: 'Taco Shells', currentStock: 200, recommendedPar: 180, action: 'OK' },
        { ingredient: 'Tomatoes (kg)', currentStock: 5, recommendedPar: 20, action: 'ORDER' }
      ],
      reasoning: 'Based on the predicted 120 burger orders at 12:00 PM, burger bun stock is critically low.'
    };
  }
}
