import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ProcurementService } from './procurement.service';

@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post('po')
  createPO(@Body() body: any) {
    return this.procurementService.createPO(body.organizationId, body.supplierId, body.expectedDate, body.items);
  }

  @Post('grn')
  receiveGoods(@Body() body: any) {
    return this.procurementService.receiveGoods(body.organizationId, body.purchaseOrderId, body.warehouseId, body.receivedItems);
  }

  @Get('recommendations')
  getRecommendations(@Query('organizationId') organizationId: string) {
    return this.procurementService.getPurchaseRecommendations(organizationId || 'default-org-id');
  }
}
