import { OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleDestroy {
    private readonly client;
    constructor();
    publish(channel: string, message: string): Promise<number>;
    onModuleDestroy(): void;
}
