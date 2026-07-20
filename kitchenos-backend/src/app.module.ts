import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KitchensModule } from './kitchens/kitchens.module';
import { OrdersModule } from './orders/orders.module';
import { RedisModule } from './redis/redis.module';
import { AiModule } from './ai/ai.module';
import { InvitationsModule } from './invitations/invitations.module';
import { AuditInterceptor } from './common/audit.interceptor';
import { KdsModule } from './kds/kds.module';
import { MenuModule } from './menu/menu.module';
import { RecipesModule } from './recipes/recipes.module';
import { InventoryModule } from './inventory/inventory.module';
import { FinanceModule } from './finance/finance.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CopilotModule } from './copilot/copilot.module';
import { ProcurementModule } from './procurement/procurement.module';
import { EmployeeModule } from './employee/employee.module';
import { NotificationModule } from './notification/notification.module';
import { CrmModule } from './crm/crm.module';
import { MarketingModule } from './marketing/marketing.module';
import { AutomationModule } from './automation/automation.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, KitchensModule, OrdersModule, RedisModule, AiModule, InvitationsModule, KdsModule, MenuModule, RecipesModule, InventoryModule, FinanceModule, AnalyticsModule, CopilotModule, ProcurementModule, EmployeeModule, NotificationModule, CrmModule, MarketingModule, AutomationModule, ApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
