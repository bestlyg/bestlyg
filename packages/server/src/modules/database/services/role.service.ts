import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDatabaseService } from '@/base';
import { Role, RoleName } from '../schemas';

@Injectable()
export class RoleService extends BaseDatabaseService<Role> {
  constructor(@InjectModel(RoleName) model: Model<Role>) {
    super(model);
  }
}
