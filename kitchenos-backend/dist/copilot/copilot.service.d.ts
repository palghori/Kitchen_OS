import { PrismaService } from '../prisma/prisma.service';
export declare class CopilotService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    chat(organizationId: string, userId: string, sessionId: string | null, message: string): Promise<{
        sessionId: string;
        message: {
            id: string;
            role: import("@prisma/client").$Enums.CopilotRole;
            createdAt: Date;
            content: string;
            sessionId: string;
        };
    }>;
    getSessionHistory(sessionId: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.CopilotRole;
        createdAt: Date;
        content: string;
        sessionId: string;
    }[]>;
}
