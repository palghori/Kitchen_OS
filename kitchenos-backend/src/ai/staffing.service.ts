import { Injectable } from '@nestjs/common';
import { DemandPredictionService } from './demand-prediction.service';

@Injectable()
export class StaffingService {
  constructor(private readonly demandPredictor: DemandPredictionService) {}

  async recommendSchedule(kitchenId: string) {
    const demand = await this.demandPredictor.forecastDemand(kitchenId);
    
    // Simple mock logic: > 100 orders/hr = 4 cooks, < 50 = 2 cooks
    return {
      kitchenId,
      recommendedCooks: [
        { shift: '10:00 AM - 2:00 PM', count: 4, reason: 'Peak lunch rush detected.' },
        { shift: '2:00 PM - 5:00 PM', count: 2, reason: 'Lull in orders.' },
        { shift: '5:00 PM - 10:00 PM', count: 5, reason: 'Heavy dinner rush projected.' }
      ]
    };
  }
}
