import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { ListProduct, Product } from './product';
import {WebsocketService} from "./websocket.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private socket: WebsocketService,
    private http: HttpClient 
  ) { } 

  productURL = '/products';

  findAll(){
    return this.http.get<ListProduct>(`${Constants.API_ENDPOINT}${this.productURL}`);
  }

  create(product: Product) {
    return this.http.post(`${Constants.API_ENDPOINT}${this.productURL}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${Constants.API_ENDPOINT}${this.productURL}/${id}`);
  }

  setPromotionDiscount(productId: number) {
    this.socket.emit('setPromotionDiscount', productId);
  }

  readFileWarning() {
    this.socket.emit('readWarning', null);
  }
  
}
