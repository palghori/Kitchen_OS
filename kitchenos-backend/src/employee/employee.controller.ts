import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('clock-in')
  clockIn(@Body() body: { userId: string; organizationId: string }) {
    return this.employeeService.clockIn(body.userId, body.organizationId);
  }

  @Post('clock-out')
  clockOut(@Body('attendanceId') attendanceId: string) {
    return this.employeeService.clockOut(attendanceId);
  }

  @Post('schedule')
  scheduleShift(@Body() body: any) {
    return this.employeeService.scheduleShift(body);
  }

  @Get(':id/performance')
  getPerformance(@Param('id') id: string) {
    return this.employeeService.getPerformance(id);
  }
}
