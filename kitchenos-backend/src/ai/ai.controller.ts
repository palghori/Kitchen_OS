import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DemandPredictionService } from './demand-prediction.service';
import { InventoryOptimizationService } from './inventory-optimization.service';
import { StaffingService } from './staffing.service';
import { NaturalLanguageInsightService } from './natural-language-insight.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly demandService: DemandPredictionService,
    private readonly inventoryService: InventoryOptimizationService,
    private readonly staffingService: StaffingService,
    private readonly insightService: NaturalLanguageInsightService
  ) {}

  @Get('forecast/demand')
  async getDemand(@Query('kitchenId') kitchenId: string) {
    return this.demandService.forecastDemand(kitchenId);
  }

  @Get('recommendations/inventory')
  async getInventoryParLevels(@Query('kitchenId') kitchenId: string) {
    return this.inventoryService.recommendParLevels(kitchenId);
  }

  @Get('recommendations/staffing')
  async getStaffing(@Query('kitchenId') kitchenId: string) {
    return this.staffingService.recommendSchedule(kitchenId);
  }

  @Post('insights/ask')
  async askQuestion(@Body() body: { query: string, kitchenId: string }) {
    return this.insightService.ask(body.query, body.kitchenId);
  }
}
