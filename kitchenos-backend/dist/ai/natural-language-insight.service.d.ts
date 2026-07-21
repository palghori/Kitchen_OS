import { PrismaService } from '../prisma/prisma.service';
export declare class NaturalLanguageInsightService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    ask(query: string, kitchenId: string): Promise<{
        query: string;
        answer: string;
        confidence: number;
    }>;
}
