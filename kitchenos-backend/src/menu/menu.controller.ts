import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu(@Query('organizationId') organizationId: string) {
    return this.menuService.getMenu(organizationId || 'default-org-id');
  }

  @Post('category')
  createCategory(@Body() body: { organizationId: string; name: string }) {
    return this.menuService.createCategory(body.organizationId, body.name);
  }

  @Post('item')
  createMenuItem(@Body() body: { categoryId: string; data: any }) {
    return this.menuService.createMenuItem(body.categoryId, body.data);
  }
}
