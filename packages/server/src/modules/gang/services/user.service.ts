import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserName } from '../schemas';
import { GangDatabaseName } from '../utils';
import { BaseDatabaseService, CreateDto, ListDto, UpdateDto } from '@/base';
import { UserDto } from '../dto';

@Injectable()
export class UserService extends BaseDatabaseService<User> {
  constructor(
    @InjectModel(UserName, GangDatabaseName)
    model: Model<User>,
  ) {
    super(model);
  }
}
