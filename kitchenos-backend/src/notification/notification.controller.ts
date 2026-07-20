import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('trigger')
  triggerEvent(@Body() body: any) {
    return this.notificationService.dispatch({
      type: body.type,
      title: body.title,
      message: body.message,
      organizationId: body.organizationId,
      userId: body.userId,
      channels: body.channels || ['PUSH']
    });
  }

  @Get()
  getNotifications(@Query('organizationId') organizationId: string, @Query('userId') userId?: string) {
    return this.notificationService.getNotifications(organizationId || 'default-org-id', userId);
  }

  @Post(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }
}
