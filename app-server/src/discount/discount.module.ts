import { Module } from '@nestjs/common';
import { DiscountGateway } from './discount.gateway';
import { ProductsService } from 'src/products/products.service';
@Module({
  providers: [DiscountGateway, ProductsService],
})
export class DiscountModule {}