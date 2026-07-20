import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DemandPredictionService {
  constructor(private readonly prisma: PrismaService) {}

  async forecastDemand(kitchenId: string, hoursAhead: number = 24) {
    // In a real scenario, this would query a time-series model (e.g., Prophet, AWS Forecast)
    // using historical order data from Prisma.
    // For now, we mock the predictive output based on generic peak hours.
    
    return {
      kitchenId,
      forecast: [
        { time: '11:00 AM', predictedOrders: 45, confidence: 0.88 },
        { time: '12:00 PM', predictedOrders: 120, confidence: 0.92 },
        { time: '6:00 PM', predictedOrders: 200, confidence: 0.85 },
        { time: '7:00 PM', predictedOrders: 180, confidence: 0.81 }
      ],
      insight: 'Expect a 15% surge in orders at 6:00 PM compared to last week.'
    };
  }
}
