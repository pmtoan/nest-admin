import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_MICROSERVICE') private readonly roleService: ClientProxy,
  ) {}

  async create(data): Promise<any> {
    return this.roleService.emit('create_role', JSON.stringify(data));
  }
}
