import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async dispatch(event: {
    type: 'INVENTORY' | 'ORDER' | 'HR' | 'FINANCE' | 'SYSTEM';
    title: string;
    message: string;
    organizationId: string;
    userId?: string;
    channels: string[]; 
  }) {
    const notification = await this.prisma.notification.create({
      data: {
        type: event.type,
        title: event.title,
        message: event.message,
        organizationId: event.organizationId,
        userId: event.userId,
        channels: event.channels,
      }
    });

    if (event.channels.includes('EMAIL')) {
      await this.sendGridAdapter(event.title, event.message, event.userId);
    }
    if (event.channels.includes('SMS')) {
      await this.twilioSmsAdapter(event.message, event.userId);
    }
    if (event.channels.includes('WHATSAPP')) {
      await this.twilioWhatsAppAdapter(event.message, event.userId);
    }
    
    return notification;
  }

  private async sendGridAdapter(subject: string, body: string, targetUserId?: string) {
    this.logger.log(`[SendGrid Email] Sending to ${targetUserId || 'Admin'} | Subject: ${subject}`);
    await new Promise(r => setTimeout(r, 200));
  }

  private async twilioSmsAdapter(body: string, targetUserId?: string) {
    this.logger.log(`[Twilio SMS] Sending to ${targetUserId || 'Admin'} | Msg: ${body}`);
    await new Promise(r => setTimeout(r, 150));
  }

  private async twilioWhatsAppAdapter(body: string, targetUserId?: string) {
    this.logger.log(`[Twilio WhatsApp] Sending to ${targetUserId || 'Admin'} | Msg: ${body}`);
    await new Promise(r => setTimeout(r, 300));
  }

  async getNotifications(organizationId: string, userId?: string) {
    return this.prisma.notification.findMany({
      where: {
        organizationId,
        ...(userId && { userId })
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
  }
}
