import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MarketingService } from './marketing.service';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get('campaigns')
  getCampaigns(@Query('organizationId') organizationId: string) {
    return this.marketingService.getCampaigns(organizationId || 'default-org-id');
  }

  @Post('generate')
  generateCampaign(@Body() body: { organizationId: string; prompt: string; segment: string }) {
    return this.marketingService.generateCampaign(body.organizationId, body.prompt, body.segment);
  }

  @Post('launch/:id')
  launchCampaign(@Param('id') id: string, @Body('message') message: string) {
    return this.marketingService.launchCampaign(id, message);
  }
}
