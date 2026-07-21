import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    clockIn(userId: string, organizationId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        userId: string;
        clockIn: Date;
        clockOut: Date | null;
        totalHours: number | null;
    }>;
    clockOut(attendanceId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        userId: string;
        clockIn: Date;
        clockOut: Date | null;
        totalHours: number | null;
    }>;
    scheduleShift(data: {
        userId: string;
        kitchenId: string;
        organizationId: string;
        startTime: string;
        endTime: string;
        role: string;
    }): Promise<{
        id: string;
        role: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        kitchenId: string;
        startTime: Date;
        endTime: Date;
    }>;
    getPerformance(userId: string): Promise<{
        totalOrdersPrepared: number;
        avgPrepTimeSeconds: number;
        totalHoursWorked: number;
    }>;
}
