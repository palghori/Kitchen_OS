import { Server } from 'socket.io';
export declare class OrderGateway {
    server: Server;
    broadcastOrderUpdate(order: any): void;
    handleJoinKitchen(client: any, kitchenId: string): void;
}
