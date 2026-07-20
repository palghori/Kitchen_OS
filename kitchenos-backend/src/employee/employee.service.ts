import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async clockIn(userId: string, organizationId: string) {
    return this.prisma.attendance.create({
      data: {
        userId,
        organizationId,
        clockIn: new Date()
      }
    });
  }

  async clockOut(attendanceId: string) {
    const attendance = await this.prisma.attendance.findUnique({ where: { id: attendanceId } });
    if (!attendance) throw new Error('Attendance record not found');

    const clockOut = new Date();
    const diffMs = clockOut.getTime() - attendance.clockIn.getTime();
    const totalHours = diffMs / (1000 * 60 * 60);

    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: {
        clockOut,
        totalHours
      }
    });
  }

  async scheduleShift(data: { userId: string; kitchenId: string; organizationId: string; startTime: string; endTime: string; role: string }) {
    return this.prisma.shift.create({
      data: {
        userId: data.userId,
        kitchenId: data.kitchenId,
        organizationId: data.organizationId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        role: data.role
      }
    });
  }

  async getPerformance(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        preparedById: userId,
        status: { in: ['READY', 'DELIVERED'] }
      }
    });

    const totalOrders = orders.length;
    let avgPrepTimeSeconds = 0;

    if (totalOrders > 0) {
      const validPrepTimes = orders.filter(o => o.prepTimeSeconds !== null).map(o => o.prepTimeSeconds as number);
      if (validPrepTimes.length > 0) {
        avgPrepTimeSeconds = validPrepTimes.reduce((sum, time) => sum + time, 0) / validPrepTimes.length;
      }
    }

    const attendance = await this.prisma.attendance.aggregate({
      where: { userId },
      _sum: { totalHours: true }
    });

    return {
      totalOrdersPrepared: totalOrders,
      avgPrepTimeSeconds,
      totalHoursWorked: attendance._sum.totalHours || 0
    };
  }
}
