import { InvitationsService } from './invitations.service';
export declare class InvitationsController {
    private readonly invitationsService;
    constructor(invitationsService: InvitationsService);
    createInvitation(req: any, body: {
        email: string;
        role: string;
    }): Promise<{
        id: string;
        email: string;
        role: string;
        organizationId: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        status: string;
    }>;
    getInvitations(req: any): Promise<{
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
