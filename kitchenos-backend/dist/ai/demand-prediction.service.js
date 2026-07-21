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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandPredictionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DemandPredictionService = class DemandPredictionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async forecastDemand(kitchenId, hoursAhead = 24) {
        return {
            kitchenId,
            forecast: [
                { time: '11:00 AM', predictedOrders: 45, confidence: 0.88 },
                { time: '12:00 PM', predictedOrders: 120, confidence: 0.92 },
                { time: '6:00 PM', predictedOrders: 200, confidence: 0.85 },
                { time: '7:00 PM', predictedOrders: 180, confidence: 0.81 }
            ],
            insight: 'Expect a 15% surge in orders at 6:00 PM compared to last week.'
        };
    }
};
exports.DemandPredictionService = DemandPredictionService;
exports.DemandPredictionService = DemandPredictionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DemandPredictionService);
//# sourceMappingURL=demand-prediction.service.js.map