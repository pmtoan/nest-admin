import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async pagination(page = 1, limit = 1, relations = []): Promise<any> {
    const { data, meta } = await super.pagination(page, limit, relations);
    return {
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta: meta,
    };
  }
}
