import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  mockIdGenerator: number = 3;

  mockListProduct: UpdateProductDto[] = [
    { "id": 1, "name": "Product 1", "price": 1.10 },
    { "id": 2, "name": "Product 2", "price": 2.20 },
    { "id": 3, "name": "Product 3", "price": 3.30 }
  ];

  //just to simulate asynchronous call
  create(createProductDto: CreateProductDto) {
    return new Promise(resolve => setTimeout(() => {
      let productDto: UpdateProductDto = createProductDto as UpdateProductDto;
      productDto.id = ++this.mockIdGenerator;
      this.mockListProduct.push(productDto);
      resolve(productDto)
    }, 1000));
  }

  findAll() {
    return this.mockListProduct;
  }

  findOne(id: number) {
    return this.mockListProduct.find(item => item.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.mockListProduct = this.mockListProduct.map(item => {
      if(item.id === id) {
        return updateProductDto;
      } else {
        return item;
      }
    });
    return updateProductDto;
  }

  //just to simulate synchronous call better
  remove(id: number) {
    setTimeout(() =>{
      this.mockListProduct = this.mockListProduct.filter(item => item.id !== id);
    }, 3000);
    return `Product with id ${id} will be deleted eventually`;
  }
}
