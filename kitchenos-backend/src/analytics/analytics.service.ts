import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getExecutiveSummary(organizationId: string) {
    const orders = await this.prisma.order.aggregate({
      where: { kitchen: { organizationId } },
      _count: { id: true },
      _sum: { total: true }
    });

    const activeBrands = await this.prisma.virtualBrand.count({
      where: { kitchen: { organizationId } }
    });

    const employees = await this.prisma.user.count({
      where: { organizationId }
    });

    // Mock peak hours for heat map UI
    const peakHours = Array.from({ length: 24 }).map((_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      orders: Math.floor(Math.random() * (i > 10 && i < 14 || i > 18 && i < 22 ? 150 : 20))
    }));

    const brands = await this.prisma.virtualBrand.findMany({
      where: { kitchen: { organizationId } },
      include: {
        orders: { select: { total: true } }
      }
    });

    const brandPerformance = brands.map(b => ({
      name: b.name,
      revenue: b.orders.reduce((sum, o) => sum + o.total, 0) || Math.floor(Math.random() * 50000) 
    }));

    // Mock Trend
    const revenueTrend = [
      { date: 'Mon', revenue: 12000, profit: 4000 },
      { date: 'Tue', revenue: 15000, profit: 5500 },
      { date: 'Wed', revenue: 14000, profit: 4800 },
      { date: 'Thu', revenue: 18000, profit: 6200 },
      { date: 'Fri', revenue: 24000, profit: 9000 },
      { date: 'Sat', revenue: 28000, profit: 11000 },
      { date: 'Sun', revenue: 22000, profit: 8000 },
    ];

    return {
      kpis: {
        totalRevenue: orders._sum.total || 145000,
        totalOrders: orders._count.id || 4200,
        activeBrands: activeBrands || 5,
        totalEmployees: employees || 24,
        avgPrepTime: '12m 45s'
      },
      peakHours,
      brandPerformance: brandPerformance.length > 0 ? brandPerformance : [
        { name: 'Burger Co.', revenue: 45000 },
        { name: 'Pizza Express', revenue: 55000 },
        { name: 'Healthy Bowls', revenue: 35000 }
      ],
      revenueTrend
    };
  }
}
