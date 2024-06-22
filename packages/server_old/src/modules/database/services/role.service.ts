import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleName } from '../schemas';
import { BaseDatabaseService } from './base.service';

@Injectable()
export class RoleService extends BaseDatabaseService<Role> {
  constructor(@InjectModel(RoleName) model: Model<Role>) {
    super(model);
  }
}
