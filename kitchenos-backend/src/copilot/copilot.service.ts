import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CopilotService {
  constructor(private readonly prisma: PrismaService) {}

  async chat(organizationId: string, userId: string, sessionId: string | null, message: string) {
    let session;
    if (sessionId) {
      session = await this.prisma.copilotSession.findUnique({ where: { id: sessionId } });
    }
    
    if (!session) {
      session = await this.prisma.copilotSession.create({
        data: {
          organizationId,
          userId,
          title: message.substring(0, 30) + '...'
        }
      });
    }

    await this.prisma.copilotMessage.create({
      data: { sessionId: session.id, role: 'USER', content: message }
    });

    // RAG Strategy: Structured Context Injection
    const context = {
      finance: { netMargin: 29.4, laborCost: 28000, foodCost: 35000, revenue: 145000 },
      inventory: { lowStockItems: ['Truffle Mayo', 'Angus Beef Patties'], waste: 450 },
      brands: { topPerformer: 'Pizza Express', underPerformer: 'Healthy Bowls' }
    };

    let aiResponse = "I'm analyzing the data right now...";
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('profit decreased') || lowerMsg.includes('why profit')) {
      aiResponse = `Based on the latest financial snapshot, your Net Profit Margin has dropped to **${context.finance.netMargin}%**. \n\nThe primary drivers are:\n1. **Labor Costs**: Spiked by 12% this week ($${context.finance.laborCost.toLocaleString()}).\n2. **Inventory Waste**: We logged $${context.inventory.waste} in wasted Truffle Mayo.\n\n*Recommendation*: Optimize the prep schedule for Truffle Mayo to reduce spoilage, and review overtime hours for the Downtown Kitchen.`;
    } 
    else if (lowerMsg.includes('ordered') || lowerMsg.includes('ingredients')) {
      aiResponse = `You have 2 items critically low on stock:\n- **${context.inventory.lowStockItems[0]}**\n- **${context.inventory.lowStockItems[1]}**\n\nI recommend generating a Purchase Request immediately. Would you like me to draft a PO to Sysco Foods?`;
    }
    else if (lowerMsg.includes('brand performs best')) {
      aiResponse = `**${context.brands.topPerformer}** is currently your top performer, generating 42% of total revenue this month.\n\nConversely, **${context.brands.underPerformer}** is underperforming. \n\n*Recommendation*: Consider running a targeted promotion for ${context.brands.underPerformer} on Swiggy and Zomato during the 6PM-8PM peak window.`;
    }
    else if (lowerMsg.includes('tomorrow') || lowerMsg.includes('predict') || lowerMsg.includes('demand')) {
      aiResponse = `**Demand Prediction for Tomorrow (Sunday):**\n\nBased on historical 30-day trends and tomorrow's weather forecast (Rain), expect a **15% surge** in delivery orders.\n\n*Staffing Recommendation*: Increase prep cooks by +2 for the 5PM-9PM shift to maintain our 12-minute Avg Prep Time target.`;
    }
    else if (lowerMsg.includes('pricing')) {
      aiResponse = `Looking at your COGS (Cost of Goods Sold):\n\nThe **Truffle Mushroom Burger** currently has a food cost of $6.05 and is selling for $14.99 (Margin: 59%). To hit your enterprise target of 70% gross margin, I recommend increasing the price to **$19.99**, or negotiating a better bulk rate for Truffle Mayo.`;
    }
    else {
      aiResponse = `I see you're asking about operational data. I'm actively monitoring your Order Volume, Inventory levels, and P&L. How can I assist you in optimizing your kitchen today?`;
    }

    // Simulate LLM processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    const aiMessage = await this.prisma.copilotMessage.create({
      data: { sessionId: session.id, role: 'AI', content: aiResponse }
    });

    return {
      sessionId: session.id,
      message: aiMessage
    };
  }

  async getSessionHistory(sessionId: string) {
    return this.prisma.copilotMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' }
    });
  }
}
