import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountModule } from './discount/discount.module';
import { ProductsModule } from './products/products.module';
import { WarningModule } from './warning/warning.module';

@Module({
  imports: [DiscountModule, WarningModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
