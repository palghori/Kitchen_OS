import { AutomationService } from './automation.service';
export declare class AutomationController {
    private readonly automationService;
    constructor(automationService: AutomationService);
    triggerEvent(body: {
        organizationId: string;
        event: string;
        data: any;
    }): Promise<void>;
}
