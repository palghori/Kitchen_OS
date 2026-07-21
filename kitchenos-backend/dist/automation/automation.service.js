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
var AutomationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let AutomationService = AutomationService_1 = class AutomationService {
    prisma;
    notificationService;
    logger = new common_1.Logger(AutomationService_1.name);
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async evaluateEvent(organizationId, triggerEvent, eventData) {
        const rules = await this.prisma.automationRule.findMany({
            where: { organizationId, trigger: triggerEvent, isActive: true }
        });
        for (const rule of rules) {
            try {
                const condition = JSON.parse(rule.conditionJson);
                const action = JSON.parse(rule.actionJson);
                let conditionMet = false;
                if (condition.operator === 'lt') {
                    conditionMet = eventData[condition.field] < condition.value;
                }
                else if (condition.operator === 'gt') {
                    conditionMet = eventData[condition.field] > condition.value;
                }
                else if (condition.operator === 'eq') {
                    conditionMet = eventData[condition.field] === condition.value;
                }
                if (conditionMet) {
                    this.logger.log(`Rule Triggered: ${rule.name}`);
                    if (action.type === 'NOTIFY') {
                        await this.notificationService.dispatch({
                            type: 'SYSTEM',
                            title: `Automation: ${rule.name}`,
                            message: action.message,
                            organizationId: organizationId,
                            channels: ['EMAIL', 'PUSH']
                        });
                    }
                }
            }
            catch (e) {
                this.logger.error(`Error evaluating rule ${rule.id}: ${e.message}`);
            }
        }
    }
};
exports.AutomationService = AutomationService;
exports.AutomationService = AutomationService = AutomationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], AutomationService);
//# sourceMappingURL=automation.service.js.map