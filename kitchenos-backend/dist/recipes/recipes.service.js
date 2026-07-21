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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecipesService = class RecipesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createIngredient(organizationId, name, unit, unitCost) {
        return this.prisma.ingredient.create({
            data: { organizationId, name, unit, unitCost }
        });
    }
    async getIngredients(organizationId) {
        return this.prisma.ingredient.findMany({ where: { organizationId } });
    }
    async getRecipeIntelligence(menuItemId) {
        const item = await this.prisma.menuItem.findUnique({
            where: { id: menuItemId },
            include: { recipe: { include: { ingredients: { include: { ingredient: true } } } } }
        });
        if (!item || !item.recipe)
            throw new common_1.NotFoundException('Recipe not found');
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
            isProfitable: profitMargin > 30,
            ingredients: item.recipe.ingredients.map(ri => ({
                name: ri.ingredient.name,
                quantity: ri.quantity,
                unit: ri.ingredient.unit,
                costContribution: ri.quantity * ri.ingredient.unitCost
            }))
        };
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map