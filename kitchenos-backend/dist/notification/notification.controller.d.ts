import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    triggerEvent(body: any): Promise<{
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
    markAsRead(id: string): Promise<{
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
