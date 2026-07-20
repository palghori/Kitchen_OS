import { Controller, Post, Body, Patch, Param, Get, Query, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body(new ValidationPipe({ transform: true })) createDto: CreateOrderDto) {
    return this.ordersService.createOrder(createDto);
  }

  @Post('webhook/swiggy')
  async handleSwiggyWebhook(@Body() payload: any) {
    // Simulated async processing for webhook
    setTimeout(async () => {
       try {
           const createDto = new CreateOrderDto();
           createDto.kitchenId = payload.store_id; 
           createDto.brandId = payload.brand_id; 
           createDto.source = 'SWIGGY' as any;
           createDto.externalId = payload.order_id;
           createDto.total = payload.order_total;
           createDto.metadata = payload;
           createDto.items = payload.cart.map(item => ({
             name: item.item_name,
             quantity: item.qty,
             price: item.price
           }));
           await this.ordersService.createOrder(createDto);
       } catch (e) {
           console.error('Webhook processing failed (expected if IDs are missing)', e.message);
       }
    }, 0);

    return { status: 'acknowledged' };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateDto);
  }

  @Get('active')
  async getActiveOrders(@Query('kitchenId') kitchenId: string) {
    return this.ordersService.getActiveOrders(kitchenId);
  }
}
