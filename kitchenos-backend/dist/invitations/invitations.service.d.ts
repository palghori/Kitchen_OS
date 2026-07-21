import { PrismaService } from '../prisma/prisma.service';
export declare class InvitationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    inviteUser(email: string, role: string, organizationId: string): Promise<{
        id: string;
        email: string;
        role: string;
        organizationId: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        status: string;
    }>;
    getInvitations(organizationId: string): Promise<{
        id: string;
        email: string;
        role: string;
        organizationId: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        status: string;
    }[]>;
}
