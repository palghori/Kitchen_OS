import { PrismaService } from '../prisma/prisma.service';
export declare class ApiService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateApiKey(organizationId: string, name: string): Promise<{
        id: string;
        name: string;
        key: string;
    }>;
    getApiKeys(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        lastUsedAt: Date | null;
    }[]>;
    revokeApiKey(id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        name: string;
        keyHash: string;
        lastUsedAt: Date | null;
    }>;
}
