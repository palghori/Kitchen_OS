import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('invitations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Roles('ADMIN', 'OWNER')
  @Post()
  async createInvitation(@Request() req, @Body() body: { email: string, role: string }) {
    return this.invitationsService.inviteUser(body.email, body.role, req.user.organizationId);
  }

  @Roles('ADMIN', 'OWNER')
  @Get()
  async getInvitations(@Request() req) {
    return this.invitationsService.getInvitations(req.user.organizationId);
  }
}
