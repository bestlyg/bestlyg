import { PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './baseUser.dto';

export class UpdateUserDto extends PartialType(BaseUserDto) {}
