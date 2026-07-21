import { PrismaService } from '../prisma/prisma.service';
export declare class MenuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCategory(organizationId: string, name: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    getMenu(organizationId: string): Promise<({
        items: ({
            recipe: ({
                ingredients: ({
                    ingredient: {
                        id: string;
                        organizationId: string;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        unit: string;
                        unitCost: number;
                        reorderPoint: number;
                    };
                } & {
                    id: string;
                    quantity: number;
                    recipeId: string;
                    ingredientId: string;
                })[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                prepTimeMinutes: number;
                calories: number | null;
                version: number;
                menuItemId: string | null;
                variantId: string | null;
            }) | null;
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                price: number;
                menuItemId: string;
            }[];
            modifierGroups: ({
                modifiers: {
                    id: string;
                    name: string;
                    price: number;
                    modifierGroupId: string;
                }[];
            } & {
                id: string;
                name: string;
                isRequired: boolean;
                maxSelect: number | null;
                menuItemId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            basePrice: number;
            isCombo: boolean;
            categoryId: string;
        })[];
    } & {
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    })[]>;
    createMenuItem(categoryId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        basePrice: number;
        isCombo: boolean;
        categoryId: string;
    }>;
}
