import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserName } from '../schemas';
import { BaseDatabaseService } from './base.service';

@Injectable()
export class UserService extends BaseDatabaseService<User> {
  constructor(@InjectModel(UserName) model: Model<User>) {
    super(model);
  }
}
