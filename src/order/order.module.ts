import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
    AuthModule,
  ],
  providers: [
    {
      provide: 'SuperOrderService',
      useClass: OrderService,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
