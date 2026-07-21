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
exports.CrmController = void 0;
const common_1 = require("@nestjs/common");
const crm_service_1 = require("./crm.service");
let CrmController = class CrmController {
    crmService;
    constructor(crmService) {
        this.crmService = crmService;
    }
    getCustomers(organizationId) {
        return this.crmService.getCustomers(organizationId || 'default-org-id');
    }
    getCustomer360(id) {
        return this.crmService.getCustomer360(id);
    }
    processOrder(body) {
        return this.crmService.processOrder(body.orderId, body.customerId);
    }
};
exports.CrmController = CrmController;
__decorate([
    (0, common_1.Get)('customers'),
    __param(0, (0, common_1.Query)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Get)('customers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "getCustomer360", null);
__decorate([
    (0, common_1.Post)('process-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "processOrder", null);
exports.CrmController = CrmController = __decorate([
    (0, common_1.Controller)('crm'),
    __metadata("design:paramtypes", [crm_service_1.CrmService])
], CrmController);
//# sourceMappingURL=crm.controller.js.map