import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../user/model/user.entity';
import { PaginatedResult } from './paginated-result';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return this.repository.find({ relations }); //get all records in table
  }

  async pagination(
    page = 1,
    limit = 1,
    relations = [],
  ): Promise<PaginatedResult> {
    const [data, total] = await this.repository.findAndCount({
      limit,
      skip: (page - 1) * limit,
      relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async create(data): Promise<any> {
    return this.repository.save(data);
  }

  async findOne(condition, relations = []): Promise<any> {
    return this.repository.findOne({ where: condition, relations });
  }

  async update(id: number, data): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
