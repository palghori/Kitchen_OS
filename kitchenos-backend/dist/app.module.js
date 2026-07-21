"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const kitchens_module_1 = require("./kitchens/kitchens.module");
const orders_module_1 = require("./orders/orders.module");
const redis_module_1 = require("./redis/redis.module");
const ai_module_1 = require("./ai/ai.module");
const invitations_module_1 = require("./invitations/invitations.module");
const audit_interceptor_1 = require("./common/audit.interceptor");
const kds_module_1 = require("./kds/kds.module");
const menu_module_1 = require("./menu/menu.module");
const recipes_module_1 = require("./recipes/recipes.module");
const inventory_module_1 = require("./inventory/inventory.module");
const finance_module_1 = require("./finance/finance.module");
const analytics_module_1 = require("./analytics/analytics.module");
const copilot_module_1 = require("./copilot/copilot.module");
const procurement_module_1 = require("./procurement/procurement.module");
const employee_module_1 = require("./employee/employee.module");
const notification_module_1 = require("./notification/notification.module");
const crm_module_1 = require("./crm/crm.module");
const marketing_module_1 = require("./marketing/marketing.module");
const automation_module_1 = require("./automation/automation.module");
const api_module_1 = require("./api/api.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, users_module_1.UsersModule, auth_module_1.AuthModule, kitchens_module_1.KitchensModule, orders_module_1.OrdersModule, redis_module_1.RedisModule, ai_module_1.AiModule, invitations_module_1.InvitationsModule, kds_module_1.KdsModule, menu_module_1.MenuModule, recipes_module_1.RecipesModule, inventory_module_1.InventoryModule, finance_module_1.FinanceModule, analytics_module_1.AnalyticsModule, copilot_module_1.CopilotModule, procurement_module_1.ProcurementModule, employee_module_1.EmployeeModule, notification_module_1.NotificationModule, crm_module_1.CrmModule, marketing_module_1.MarketingModule, automation_module_1.AutomationModule, api_module_1.ApiModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_interceptor_1.AuditInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map