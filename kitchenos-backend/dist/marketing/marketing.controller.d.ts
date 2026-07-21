import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
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
    generateCampaign(body: {
        organizationId: string;
        prompt: string;
        segment: string;
    }): Promise<{
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
    launchCampaign(id: string, message: string): Promise<{
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
}
