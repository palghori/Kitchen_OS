import { ApiService } from './api.service';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    getApiKeys(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        lastUsedAt: Date | null;
    }[]>;
    generateApiKey(body: {
        organizationId: string;
        name: string;
    }): Promise<{
        id: string;
        name: string;
        key: string;
    }>;
    revokeApiKey(id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        name: string;
        keyHash: string;
        lastUsedAt: Date | null;
    }>;
}
