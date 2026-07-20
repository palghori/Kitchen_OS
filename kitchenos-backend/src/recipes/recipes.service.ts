import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async createIngredient(organizationId: string, name: string, unit: string, unitCost: number) {
    return this.prisma.ingredient.create({
      data: { organizationId, name, unit, unitCost }
    });
  }

  async getIngredients(organizationId: string) {
    return this.prisma.ingredient.findMany({ where: { organizationId } });
  }

  async getRecipeIntelligence(menuItemId: string) {
    const item = await this.prisma.menuItem.findUnique({
      where: { id: menuItemId },
      include: { recipe: { include: { ingredients: { include: { ingredient: true } } } } }
    });

    if (!item || !item.recipe) throw new NotFoundException('Recipe not found');

    const foodCost = item.recipe.ingredients.reduce((total, ri) => {
      return total + (ri.quantity * ri.ingredient.unitCost);
    }, 0);

    const sellingPrice = item.basePrice;
    const profitMargin = sellingPrice > 0 ? ((sellingPrice - foodCost) / sellingPrice) * 100 : 0;

    return {
      menuItemId: item.id,
      name: item.name,
      prepTimeMinutes: item.recipe.prepTimeMinutes,
      calories: item.recipe.calories,
      foodCost: parseFloat(foodCost.toFixed(2)),
      sellingPrice,
      profitMargin: parseFloat(profitMargin.toFixed(2)),
      isProfitable: profitMargin > 30, // Critical threshold alert indicator
      ingredients: item.recipe.ingredients.map(ri => ({
        name: ri.ingredient.name,
        quantity: ri.quantity,
        unit: ri.ingredient.unit,
        costContribution: ri.quantity * ri.ingredient.unitCost
      }))
    };
  }
}
