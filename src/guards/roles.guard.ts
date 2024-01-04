// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../user/types/userRole';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // @Roles() 데코레이터가 적용되지 않은 경우에는 허용
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (!user || !user.role || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
