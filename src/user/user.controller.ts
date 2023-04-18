import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './model/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './model/user-update.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor) // transform data in entity
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get()
  async all(@Query('page') page = 1) {
    return this.userService.pagination(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto) {
    const password = await bcrypt.hash('1234', await bcrypt.genSalt());

    const { role_id, ...data } = body;

    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put('info')
  async updateInfo(@Body() body: UserUpdateDto, @Req() req: Request) {
    const id = await this.authService.userId(req);

    await this.userService.update(id, body);

    return this.userService.findOne({ id });
  }

  @Put('password')
  async updatePassword(
    @Req() req: Request,
    @Body('password') password: string,
    @Body('password_confirm') passwordConfirm: string,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Password do not match');
    }

    const id = await this.authService.userId(req);

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());

    await this.userService.update(id, {
      password: hashedPassword,
    });

    return this.userService.findOne({ id });
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;
    const updateObject = { ...data, role: { id: role_id } };

    await this.userService.update(id, updateObject);

    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
