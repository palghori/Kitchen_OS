import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('dashboard')
  getDashboard(@Query('organizationId') organizationId: string) {
    return this.inventoryService.getDashboardMetrics(organizationId || 'default-org-id');
  }

  @Post('deduct')
  deductStock(@Body() body: { orderId: string, warehouseId: string }) {
    return this.inventoryService.deductStockForOrder(body.orderId, body.warehouseId);
  }
}
