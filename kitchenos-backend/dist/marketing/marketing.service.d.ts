import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class MarketingService {
    private readonly prisma;
    private readonly notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    generateCampaign(organizationId: string, prompt: string, segment: string): Promise<{
        campaign: {
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: string;
            channels: string[];
            targetSegment: string;
            sentCount: number;
            openCount: number;
            conversionCount: number;
            revenueGenerated: number;
        };
        suggestedCopy: string;
    }>;
    launchCampaign(campaignId: string, messageBody: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string;
        channels: string[];
        targetSegment: string;
        sentCount: number;
        openCount: number;
        conversionCount: number;
        revenueGenerated: number;
    }>;
    getCampaigns(organizationId: string): Promise<({
        coupons: {
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            expiryDate: Date | null;
            code: string;
            discountType: string;
            discountAmount: number;
            isActive: boolean;
            marketingCampaignId: string | null;
        }[];
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string;
        channels: string[];
        targetSegment: string;
        sentCount: number;
        openCount: number;
        conversionCount: number;
        revenueGenerated: number;
    })[]>;
}
