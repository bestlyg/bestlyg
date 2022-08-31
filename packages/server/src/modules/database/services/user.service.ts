import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDatabaseService } from '@/base';
import { User, UserName } from '../schemas';

@Injectable()
export class UserService extends BaseDatabaseService<User> {
  constructor(@InjectModel(UserName) model: Model<User>) {
    super(model);
  }
}
