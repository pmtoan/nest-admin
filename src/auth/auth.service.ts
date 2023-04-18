import { Get, Inject, Injectable, Req } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async userId(req: Request): Promise<number> {
    const cookie = req.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    return data['id'];
  }
}
