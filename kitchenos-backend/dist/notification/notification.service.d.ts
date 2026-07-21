import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    dispatch(event: {
        type: 'INVENTORY' | 'ORDER' | 'HR' | 'FINANCE' | 'SYSTEM';
        title: string;
        message: string;
        organizationId: string;
        userId?: string;
        channels: string[];
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        userId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        title: string;
        message: string;
        isRead: boolean;
        channels: string[];
    }>;
    private sendGridAdapter;
    private twilioSmsAdapter;
    private twilioWhatsAppAdapter;
    getNotifications(organizationId: string, userId?: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        userId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        title: string;
        message: string;
        isRead: boolean;
        channels: string[];
    }[]>;
    markAsRead(notificationId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        userId: string | null;
        type: import("@prisma/client").$Enums.NotificationType;
        title: string;
        message: string;
        isRead: boolean;
        channels: string[];
    }>;
}
