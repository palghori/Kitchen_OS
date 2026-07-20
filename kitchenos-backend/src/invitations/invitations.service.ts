import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class InvitationsService {
  constructor(private readonly prisma: PrismaService) {}

  async inviteUser(email: string, role: string, organizationId: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = await this.prisma.userInvitation.create({
      data: {
        email,
        role,
        organizationId,
        token,
        expiresAt
      }
    });

    // In a real app, trigger email sending here
    return invite;
  }

  async getInvitations(organizationId: string) {
    return this.prisma.userInvitation.findMany({ where: { organizationId } });
  }
}
