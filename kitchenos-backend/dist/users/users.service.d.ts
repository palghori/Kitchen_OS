import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        role: string;
        organizationId: string;
        twoFactorSecret: string | null;
        isTwoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: any): Promise<{
        id: string;
        email: string;
        password: string;
        role: string;
        organizationId: string;
        twoFactorSecret: string | null;
        isTwoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
