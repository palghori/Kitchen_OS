import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    clockIn(body: {
        userId: string;
        organizationId: string;
    }): Promise<{
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
    scheduleShift(body: any): Promise<{
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
    getPerformance(id: string): Promise<{
        totalOrdersPrepared: number;
        avgPrepTimeSeconds: number;
        totalHoursWorked: number;
    }>;
}
