import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(organizationId: string, name: string) {
    return this.prisma.menuCategory.create({
      data: { name, organizationId },
    });
  }

  async getMenu(organizationId: string) {
    return this.prisma.menuCategory.findMany({
      where: { organizationId },
      include: {
        items: {
          include: {
            variants: true,
            modifierGroups: {
              include: { modifiers: true }
            },
            recipe: { include: { ingredients: { include: { ingredient: true } } } }
          }
        }
      }
    });
  }

  async createMenuItem(categoryId: string, data: any) {
    return this.prisma.menuItem.create({
      data: {
        categoryId,
        name: data.name,
        basePrice: data.basePrice,
        isCombo: data.isCombo || false,
        variants: {
          create: data.variants || []
        },
        modifierGroups: {
          create: (data.modifierGroups || []).map((mg: any) => ({
            name: mg.name,
            isRequired: mg.isRequired,
            maxSelect: mg.maxSelect,
            modifiers: {
              create: mg.modifiers || []
            }
          }))
        }
      }
    });
  }
}
