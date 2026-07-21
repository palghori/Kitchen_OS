import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(token: string): Promise<{
        access_token: string;
    }>;
    adminOnlyRoute(): {
        message: string;
    };
    getProfile(req: any): any;
}
