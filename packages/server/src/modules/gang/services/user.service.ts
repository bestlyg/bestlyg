import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserName } from '../schemas';
import { GangDatabaseName } from '../utils';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserName, GangDatabaseName)
    private readonly model: Model<User>,
  ) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    return new this.model(createCatDto).save();
  }

  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }
}
