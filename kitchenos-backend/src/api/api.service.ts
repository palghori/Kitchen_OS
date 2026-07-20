import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ApiService {
  constructor(private readonly prisma: PrismaService) {}

  async generateApiKey(organizationId: string, name: string) {
    const rawKey = crypto.randomBytes(32).toString('hex');
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    const apiKey = await this.prisma.apiKey.create({
      data: {
        organizationId,
        name,
        keyHash
      }
    });

    return { id: apiKey.id, name: apiKey.name, key: rawKey };
  }

  async getApiKeys(organizationId: string) {
    return this.prisma.apiKey.findMany({
      where: { organizationId },
      select: { id: true, name: true, createdAt: true, lastUsedAt: true }
    });
  }

  async revokeApiKey(id: string) {
    return this.prisma.apiKey.delete({ where: { id } });
  }
}
