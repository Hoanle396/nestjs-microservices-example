import { SetMetadata } from '@nestjs/common';
export const AUTHORIZATION = 'Authorization';

export const Authorization = () => SetMetadata(AUTHORIZATION, true);
