import { CopilotService } from './copilot.service';
export declare class CopilotController {
    private readonly copilotService;
    constructor(copilotService: CopilotService);
    chat(body: {
        organizationId: string;
        userId: string;
        sessionId?: string;
        message: string;
    }): Promise<{
        sessionId: string;
        message: {
            id: string;
            role: import("@prisma/client").$Enums.CopilotRole;
            createdAt: Date;
            content: string;
            sessionId: string;
        };
    }>;
    getSessionHistory(id: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.CopilotRole;
        createdAt: Date;
        content: string;
        sessionId: string;
    }[]>;
}
