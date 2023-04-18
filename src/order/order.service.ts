import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async pagination(page = 1, limit = 1, relations = []): Promise<any> {
    const { data, meta } = await super.pagination(page, limit, relations);
    return {
      data: data,
      meta: meta,
    };
  }

  async chart(): Promise<any> {
    return this.orderRepository.query(
      "select DATE_FORMAT(create_at, '%Y-%m-%d') as date, sum(order_items.price * order_items.quantity) as total\n" +
        'from orders join order_items on orders.id = order_items.order_id\n' +
        'GROUP BY date',
    );
  }
}
