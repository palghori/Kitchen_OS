import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/orders' })
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  broadcastOrderUpdate(order: any) {
    this.server.emit('orderUpdated', order);
  }

  @SubscribeMessage('joinKitchen')
  handleJoinKitchen(client: any, @MessageBody() kitchenId: string) {
    client.join(kitchenId);
  }
}
