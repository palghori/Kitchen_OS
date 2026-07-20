import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('executive-summary')
  getExecutiveSummary(@Query('organizationId') organizationId: string) {
    return this.analyticsService.getExecutiveSummary(organizationId || 'default-org-id');
  }
}
