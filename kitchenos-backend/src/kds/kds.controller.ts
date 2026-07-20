import { Controller, Get, Query } from '@nestjs/common';
import { KdsService } from './kds.service';

@Controller('kds')
export class KdsController {
  constructor(private readonly kdsService: KdsService) {}

  @Get('metrics')
  getMetrics(@Query('kitchenId') kitchenId: string) {
    return this.kdsService.getMetrics(kitchenId || 'default_kitchen');
  }
}
