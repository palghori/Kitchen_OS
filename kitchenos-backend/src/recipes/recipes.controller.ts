import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('ingredients')
  createIngredient(@Body() body: { organizationId: string; name: string; unit: string; unitCost: number }) {
    return this.recipesService.createIngredient(body.organizationId, body.name, body.unit, body.unitCost);
  }

  @Get('ingredients')
  getIngredients(@Query('organizationId') organizationId: string) {
    return this.recipesService.getIngredients(organizationId);
  }

  @Get('intelligence/:menuItemId')
  getRecipeIntelligence(@Param('menuItemId') menuItemId: string) {
    return this.recipesService.getRecipeIntelligence(menuItemId);
  }
}
