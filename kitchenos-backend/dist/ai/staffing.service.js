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
exports.StaffingService = void 0;
const common_1 = require("@nestjs/common");
const demand_prediction_service_1 = require("./demand-prediction.service");
let StaffingService = class StaffingService {
    demandPredictor;
    constructor(demandPredictor) {
        this.demandPredictor = demandPredictor;
    }
    async recommendSchedule(kitchenId) {
        const demand = await this.demandPredictor.forecastDemand(kitchenId);
        return {
            kitchenId,
            recommendedCooks: [
                { shift: '10:00 AM - 2:00 PM', count: 4, reason: 'Peak lunch rush detected.' },
                { shift: '2:00 PM - 5:00 PM', count: 2, reason: 'Lull in orders.' },
                { shift: '5:00 PM - 10:00 PM', count: 5, reason: 'Heavy dinner rush projected.' }
            ]
        };
    }
};
exports.StaffingService = StaffingService;
exports.StaffingService = StaffingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [demand_prediction_service_1.DemandPredictionService])
], StaffingService);
//# sourceMappingURL=staffing.service.js.map