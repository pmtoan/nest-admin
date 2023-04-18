import { createParamDecorator, SetMetadata } from "@nestjs/common";

export const HasPermission = (access: string) => SetMetadata('access', access);

export const HasPermissionV2 = createParamDecorator(
  (data, ctx)=> {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
)
