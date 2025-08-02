import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ImpostoService } from './imposto/imposto.service';

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [AppService, ImpostoService],
})
export class AppModule {}
