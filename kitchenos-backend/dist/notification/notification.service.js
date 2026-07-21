"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async dispatch(event) {
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
    async sendGridAdapter(subject, body, targetUserId) {
        this.logger.log(`[SendGrid Email] Sending to ${targetUserId || 'Admin'} | Subject: ${subject}`);
        await new Promise(r => setTimeout(r, 200));
    }
    async twilioSmsAdapter(body, targetUserId) {
        this.logger.log(`[Twilio SMS] Sending to ${targetUserId || 'Admin'} | Msg: ${body}`);
        await new Promise(r => setTimeout(r, 150));
    }
    async twilioWhatsAppAdapter(body, targetUserId) {
        this.logger.log(`[Twilio WhatsApp] Sending to ${targetUserId || 'Admin'} | Msg: ${body}`);
        await new Promise(r => setTimeout(r, 300));
    }
    async getNotifications(organizationId, userId) {
        return this.prisma.notification.findMany({
            where: {
                organizationId,
                ...(userId && { userId })
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
    }
    async markAsRead(notificationId) {
        return this.prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true }
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map