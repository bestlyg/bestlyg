import { BaseDataBaseService } from '@/database';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserModel } from './user.model';

@Injectable()
export class UserService extends BaseDataBaseService<User, UserModel> {
  constructor(@Inject('User_MODEL') model: Model<User>) {
    super(model);
  }
}
