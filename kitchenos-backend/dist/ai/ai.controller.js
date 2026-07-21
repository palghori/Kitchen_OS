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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const demand_prediction_service_1 = require("./demand-prediction.service");
const inventory_optimization_service_1 = require("./inventory-optimization.service");
const staffing_service_1 = require("./staffing.service");
const natural_language_insight_service_1 = require("./natural-language-insight.service");
let AiController = class AiController {
    demandService;
    inventoryService;
    staffingService;
    insightService;
    constructor(demandService, inventoryService, staffingService, insightService) {
        this.demandService = demandService;
        this.inventoryService = inventoryService;
        this.staffingService = staffingService;
        this.insightService = insightService;
    }
    async getDemand(kitchenId) {
        return this.demandService.forecastDemand(kitchenId);
    }
    async getInventoryParLevels(kitchenId) {
        return this.inventoryService.recommendParLevels(kitchenId);
    }
    async getStaffing(kitchenId) {
        return this.staffingService.recommendSchedule(kitchenId);
    }
    async askQuestion(body) {
        return this.insightService.ask(body.query, body.kitchenId);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('forecast/demand'),
    __param(0, (0, common_1.Query)('kitchenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getDemand", null);
__decorate([
    (0, common_1.Get)('recommendations/inventory'),
    __param(0, (0, common_1.Query)('kitchenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getInventoryParLevels", null);
__decorate([
    (0, common_1.Get)('recommendations/staffing'),
    __param(0, (0, common_1.Query)('kitchenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getStaffing", null);
__decorate([
    (0, common_1.Post)('insights/ask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "askQuestion", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [demand_prediction_service_1.DemandPredictionService,
        inventory_optimization_service_1.InventoryOptimizationService,
        staffing_service_1.StaffingService,
        natural_language_insight_service_1.NaturalLanguageInsightService])
], AiController);
//# sourceMappingURL=ai.controller.js.map