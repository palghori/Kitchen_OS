import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('developers/api-keys')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getApiKeys(@Query('organizationId') organizationId: string) {
    return this.apiService.getApiKeys(organizationId || 'default-org-id');
  }

  @Post()
  generateApiKey(@Body() body: { organizationId: string; name: string }) {
    return this.apiService.generateApiKey(body.organizationId, body.name);
  }

  @Delete(':id')
  revokeApiKey(@Param('id') id: string) {
    return this.apiService.revokeApiKey(id);
  }
}
