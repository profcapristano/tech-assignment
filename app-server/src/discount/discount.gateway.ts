import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductsService } from '../products/products.service';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class DiscountGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly productsService: ProductsService) {}

  @WebSocketServer() server: Server;

  promotionDiscount = {};
 
  handleConnection() {
    this.server.emit('promotionDiscount', this.promotionDiscount);
  }

  handleDisconnect() { }

  @SubscribeMessage('setPromotionDiscount')
  async setPromotionDiscount(_, id) {
    this.promotionDiscount = this.productsService.findOne(+id);
    this.server.emit('promotionDiscount', this.promotionDiscount);
  }

}