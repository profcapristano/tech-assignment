import { Component, OnInit } from '@angular/core';
import { ListProduct, Product } from 'src/app/services/product';
import { ProductService } from 'src/app/services/product.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss']
})
export class ConsoleLogsComponent implements OnInit {
  messages = [""];

  constructor(
    private productService: ProductService,
    private socket: WebsocketService
  ) { }

  async ngOnInit(): Promise<void> {

    this.findAllProducts();

    const idToDelete: number = 1;
    this.productService.delete(idToDelete).subscribe(
      () => this.messages = [...this.messages, `Product with id ${idToDelete} will be deleted eventually`]
    );

    this.productService.create(new Product("Product 4", 4.40)).subscribe(
      () => this.messages = [...this.messages, "Creating a product and sending to backend using Rest..."],
      (err) => console.log(`Error creating a new product: ${err}`),
      () => this.findAllProducts(),
    );

    this.socket.on("promotionDiscount", (product:Product) => {
      this.messages = [...this.messages, "Getting a promotional product from backend using WebSocket listner..."];
      this.messages = [...this.messages, this.productToString(product)];
    });

    this.socket.on("warning", (fileContent:string) => {
      this.messages = [...this.messages, "Getting file content from Shared folder using WebSocket listner..."];
      this.messages = [...this.messages, fileContent];
    });

    setTimeout(() => {
      this.messages = [...this.messages, "Setting a new promotional product to backend using WebSocket..."];
      this.productService.setPromotionDiscount(2);
    }, 3000);

    setTimeout(() => {
      this.messages = [...this.messages, "Getting all products after 5 seconds..."];
      this.findAllProducts();
    }, 5000);

  }

  productToString(product: Product) {
    return typeof product.id === 'undefined' ? "No product" : `${product.id} - ${product.name}: ${product.price}`;
  }

  findAllProducts() {
    //handling an Observable
    this.productService.findAll().subscribe((listProduct: ListProduct) => {
      this.messages = [...this.messages, "Getting products from backend using rest..."];
      listProduct.forEach(product => {
        this.messages.push(this.productToString(product));
      });
    });
  }

}
