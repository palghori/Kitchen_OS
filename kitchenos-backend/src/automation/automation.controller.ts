import { Controller, Post, Body } from '@nestjs/common';
import { AutomationService } from './automation.service';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('trigger')
  triggerEvent(@Body() body: { organizationId: string; event: string; data: any }) {
    return this.automationService.evaluateEvent(body.organizationId, body.event, body.data);
  }
}
