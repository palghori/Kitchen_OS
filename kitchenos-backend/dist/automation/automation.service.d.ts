import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class AutomationService {
    private prisma;
    private notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    evaluateEvent(organizationId: string, triggerEvent: string, eventData: any): Promise<void>;
}
