import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NaturalLanguageInsightService {
  constructor(private readonly prisma: PrismaService) {}

  async ask(query: string, kitchenId: string) {
    // In production, this sends the query and the DB schema to an LLM (e.g. Gemini 1.5 Pro)
    // The LLM generates a SQL query, we execute it, and the LLM summarizes the result.
    
    const lowerQuery = query.toLowerCase();
    
    let answer = "I'm sorry, I couldn't understand that query.";
    
    if (lowerQuery.includes('sales down') || lowerQuery.includes('revenue')) {
      answer = "Sales were down 12% yesterday primarily because the 'Spicy Taco Co.' virtual brand was paused on UberEats for 3 hours during peak dinner service.";
    } else if (lowerQuery.includes('best selling') || lowerQuery.includes('popular')) {
      answer = "The 'Classic Cheeseburger' from Burger Haven is your top seller this week, making up 28% of total volume.";
    }

    return {
      query,
      answer,
      confidence: 0.95
    };
  }
}
