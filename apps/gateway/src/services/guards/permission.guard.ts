import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PERMISSION } from '../../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('PERMISSION_SERVICE')
    private readonly permissionServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<string[]>(
      PERMISSION,
      context.getHandler(),
    );

    if (!permission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const permissionInfo = await firstValueFrom(
      this.permissionServiceClient.send('permission_check', {
        permission,
        user: request.user,
      }),
    );

    if (!permissionInfo || permissionInfo.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: permissionInfo.message,
          data: null,
          errors: null,
        },
        permissionInfo.status,
      );
    }

    return true;
  }
}
