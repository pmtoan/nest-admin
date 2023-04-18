import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AbstractService } from '../common/abstract.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
     @Inject('SuperOrderService') private orderService: AbstractService,
  ) {}

  @Get()
  async all(@Query('page') page = 1) {
    return this.orderService.pagination(page);
  }

  // @Get('chart')
  // async chart() {
  //   return this.orderService.chart();
  // }
}
