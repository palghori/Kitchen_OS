"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalLanguageInsightService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NaturalLanguageInsightService = class NaturalLanguageInsightService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ask(query, kitchenId) {
        const lowerQuery = query.toLowerCase();
        let answer = "I'm sorry, I couldn't understand that query.";
        if (lowerQuery.includes('sales down') || lowerQuery.includes('revenue')) {
            answer = "Sales were down 12% yesterday primarily because the 'Spicy Taco Co.' virtual brand was paused on UberEats for 3 hours during peak dinner service.";
        }
        else if (lowerQuery.includes('best selling') || lowerQuery.includes('popular')) {
            answer = "The 'Classic Cheeseburger' from Burger Haven is your top seller this week, making up 28% of total volume.";
        }
        return {
            query,
            answer,
            confidence: 0.95
        };
    }
};
exports.NaturalLanguageInsightService = NaturalLanguageInsightService;
exports.NaturalLanguageInsightService = NaturalLanguageInsightService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NaturalLanguageInsightService);
//# sourceMappingURL=natural-language-insight.service.js.map