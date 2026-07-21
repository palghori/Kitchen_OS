"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EmployeeService = class EmployeeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async clockIn(userId, organizationId) {
        return this.prisma.attendance.create({
            data: {
                userId,
                organizationId,
                clockIn: new Date()
            }
        });
    }
    async clockOut(attendanceId) {
        const attendance = await this.prisma.attendance.findUnique({ where: { id: attendanceId } });
        if (!attendance)
            throw new Error('Attendance record not found');
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
    async scheduleShift(data) {
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
    async getPerformance(userId) {
        const orders = await this.prisma.order.findMany({
            where: {
                preparedById: userId,
                status: { in: ['READY', 'DELIVERED'] }
            }
        });
        const totalOrders = orders.length;
        let avgPrepTimeSeconds = 0;
        if (totalOrders > 0) {
            const validPrepTimes = orders.filter(o => o.prepTimeSeconds !== null).map(o => o.prepTimeSeconds);
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
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map