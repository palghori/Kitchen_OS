import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { DemandPredictionService } from './demand-prediction.service';
import { InventoryOptimizationService } from './inventory-optimization.service';
import { StaffingService } from './staffing.service';
import { NaturalLanguageInsightService } from './natural-language-insight.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [
    DemandPredictionService,
    InventoryOptimizationService,
    StaffingService,
    NaturalLanguageInsightService
  ]
})
export class AiModule {}
