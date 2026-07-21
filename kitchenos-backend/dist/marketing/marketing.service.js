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
var MarketingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let MarketingService = MarketingService_1 = class MarketingService {
    prisma;
    notificationService;
    logger = new common_1.Logger(MarketingService_1.name);
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async generateCampaign(organizationId, prompt, segment) {
        const campaignName = `${prompt.substring(0, 15)} Campaign`;
        const discountCode = `PROMO-${Math.floor(Math.random() * 10000)}`;
        const copy = `Hi there! We miss you. Use code ${discountCode} for 20% off your next order. Valid for 48 hours!`;
        const campaign = await this.prisma.marketingCampaign.create({
            data: {
                organizationId,
                name: campaignName,
                targetSegment: segment,
                channels: ['WHATSAPP', 'PUSH'],
                status: 'DRAFT',
                coupons: {
                    create: {
                        organizationId,
                        code: discountCode,
                        discountType: 'PERCENTAGE',
                        discountAmount: 20
                    }
                }
            }
        });
        return { campaign, suggestedCopy: copy };
    }
    async launchCampaign(campaignId, messageBody) {
        const campaign = await this.prisma.marketingCampaign.findUnique({
            where: { id: campaignId }
        });
        if (!campaign)
            throw new Error('Campaign not found');
        const targetCustomers = await this.prisma.customer.findMany({
            where: {
                organizationId: campaign.organizationId,
                segment: campaign.targetSegment
            }
        });
        let sentCount = 0;
        for (const customer of targetCustomers) {
            await this.notificationService.dispatch({
                type: 'SYSTEM',
                title: campaign.name,
                message: messageBody,
                organizationId: campaign.organizationId,
                userId: customer.id,
                channels: campaign.channels
            });
            sentCount++;
        }
        return this.prisma.marketingCampaign.update({
            where: { id: campaignId },
            data: { status: 'ACTIVE', sentCount }
        });
    }
    async getCampaigns(organizationId) {
        return this.prisma.marketingCampaign.findMany({
            where: { organizationId },
            include: { coupons: true },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = MarketingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map