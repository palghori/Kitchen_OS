import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('pnl')
  getProfitAndLoss(
    @Query('organizationId') organizationId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.financeService.getProfitAndLoss(
      organizationId || 'default-org-id', 
      startDate ? new Date(startDate) : undefined, 
      endDate ? new Date(endDate) : undefined
    );
  }

  @Post('expense')
  recordExpense(@Body() body: any) {
    return this.financeService.recordExpense(body.organizationId, body.data);
  }
}
