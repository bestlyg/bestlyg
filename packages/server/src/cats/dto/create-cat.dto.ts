import { BaseCreateDto } from '@/base';

export class CreateCatDto extends BaseCreateDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
