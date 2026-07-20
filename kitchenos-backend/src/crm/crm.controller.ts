import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('customers')
  getCustomers(@Query('organizationId') organizationId: string) {
    return this.crmService.getCustomers(organizationId || 'default-org-id');
  }

  @Get('customers/:id')
  getCustomer360(@Param('id') id: string) {
    return this.crmService.getCustomer360(id);
  }

  @Post('process-order')
  processOrder(@Body() body: { orderId: string; customerId: string }) {
    return this.crmService.processOrder(body.orderId, body.customerId);
  }
}
