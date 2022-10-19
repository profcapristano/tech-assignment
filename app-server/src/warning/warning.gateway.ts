import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as fs from 'fs';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class WarningGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  warning = "";
 
  handleConnection() {
    this.readFile().then(result => {
      this.warning = result;
      this.server.emit('warning', this.warning);
    });
  }

  handleDisconnect() { }

  readFile(): Promise<string> {
    //handling a Promise
    return new Promise(resolve => {
      fs.readFile('../Shared/warning.txt', 'utf8', (err, data) => {
        if (err) {
          resolve("Can't read the file.");
        }
        resolve(data);
      });
    })
  }

  @SubscribeMessage('readWarning')
  async readWarning() {
    await this.readFile().then(result => {
      this.warning = result;
      this.server.emit('warning', this.warning);
    });
  }


}