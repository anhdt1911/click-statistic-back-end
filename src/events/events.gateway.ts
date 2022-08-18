import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClickDto } from './click.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('clicked')
  handleClicked(@MessageBody() data: ClickDto): any {
    this.server.emit('update', {
      colour: data.colour,
      times: data.times,
    } as ClickDto);
  }
}
