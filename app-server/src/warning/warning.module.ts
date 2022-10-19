import { Module } from '@nestjs/common';
import { WarningGateway } from './warning.gateway';

@Module({
  providers: [WarningGateway],
})
export class WarningModule {}