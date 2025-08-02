import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ImpostoService } from 'src/imposto/imposto.service';

@Module({
  providers: [OrderService , ImpostoService],
  controllers: [OrderController]
})
export class OrderModule {}
