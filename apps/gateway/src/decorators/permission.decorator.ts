import { SetMetadata } from '@nestjs/common';
export const PERMISSION = 'permission';

export const Permission = (permission: string) =>
  SetMetadata(PERMISSION, permission);
