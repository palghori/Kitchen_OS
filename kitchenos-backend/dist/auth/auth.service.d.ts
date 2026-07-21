import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(token: string): Promise<{
        access_token: string;
    }>;
}
