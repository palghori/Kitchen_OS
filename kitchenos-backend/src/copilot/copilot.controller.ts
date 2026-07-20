import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CopilotService } from './copilot.service';

@Controller('copilot')
export class CopilotController {
  constructor(private readonly copilotService: CopilotService) {}

  @Post('chat')
  chat(@Body() body: { organizationId: string; userId: string; sessionId?: string; message: string }) {
    return this.copilotService.chat(body.organizationId, body.userId, body.sessionId || null, body.message);
  }

  @Get('session/:id')
  getSessionHistory(@Param('id') id: string) {
    return this.copilotService.getSessionHistory(id);
  }
}
