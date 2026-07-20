import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  async evaluateEvent(organizationId: string, triggerEvent: string, eventData: any) {
    const rules = await this.prisma.automationRule.findMany({
      where: { organizationId, trigger: triggerEvent, isActive: true }
    });

    for (const rule of rules) {
      try {
        const condition = JSON.parse(rule.conditionJson);
        const action = JSON.parse(rule.actionJson);

        let conditionMet = false;
        
        if (condition.operator === 'lt') {
          conditionMet = eventData[condition.field] < condition.value;
        } else if (condition.operator === 'gt') {
          conditionMet = eventData[condition.field] > condition.value;
        } else if (condition.operator === 'eq') {
          conditionMet = eventData[condition.field] === condition.value;
        }

        if (conditionMet) {
          this.logger.log(`Rule Triggered: ${rule.name}`);
          
          if (action.type === 'NOTIFY') {
            await this.notificationService.dispatch({
              type: 'SYSTEM',
              title: `Automation: ${rule.name}`,
              message: action.message,
              organizationId: organizationId,
              userId: null,
              channels: ['EMAIL', 'PUSH']
            });
          }
        }

      } catch (e) {
        this.logger.error(`Error evaluating rule ${rule.id}: ${e.message}`);
      }
    }
  }
}
