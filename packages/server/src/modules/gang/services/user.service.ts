import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserName } from '../schemas';
import { GangDatabaseName } from '../utils';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserName, GangDatabaseName)
    private readonly model: Model<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return new this.model(dto).save();
  }
  async update(dto: UpdateUserDto): Promise<boolean> {
    dto.updateTime = new Date();
    return this.model
      .findByIdAndUpdate(dto._id, dto)
      .exec()
      .then(() => true);
  }
  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }
  async removeAll(): Promise<boolean> {
    return this.model.remove().exec();
  }
  async removeLogic(_id: string): Promise<boolean> {
    return this.update({ _id, deleted: true });
  }
}
