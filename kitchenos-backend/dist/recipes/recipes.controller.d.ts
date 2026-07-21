import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createIngredient(body: {
        organizationId: string;
        name: string;
        unit: string;
        unitCost: number;
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        unit: string;
        unitCost: number;
        reorderPoint: number;
    }>;
    getIngredients(organizationId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        unit: string;
        unitCost: number;
        reorderPoint: number;
    }[]>;
    getRecipeIntelligence(menuItemId: string): Promise<{
        menuItemId: string;
        name: string;
        prepTimeMinutes: number;
        calories: number | null;
        foodCost: number;
        sellingPrice: number;
        profitMargin: number;
        isProfitable: boolean;
        ingredients: {
            name: string;
            quantity: number;
            unit: string;
            costContribution: number;
        }[];
    }>;
}
