import { Schema, Model } from 'mongoose';
import { CreateDto, UpdateDto, ListDto, RemoveDto } from './base.dto';

export class BaseDatabaseService<T extends Schema<any>> {
  constructor(protected readonly model: Model<T>) {}
  async create(dto: CreateDto): Promise<T> {
    return new this.model(dto).save();
  }
  async remove(dto: RemoveDto): Promise<boolean> {
    return this.model.remove(dto).exec();
  }
  async removeLogic(_id: string): Promise<boolean> {
    return this.update({ _id, deleted: true });
  }
  async update(dto: UpdateDto): Promise<boolean> {
    dto.updateTime = new Date();
    return this.model
      .findByIdAndUpdate(dto._id, dto)
      .exec()
      .then(() => true);
  }
  async list(dto: ListDto): Promise<T[]> {
    return this.model.find(dto).exec();
  }
  async listLogic(dto: ListDto) {
    dto.deleted = false;
    return this.list(dto);
  }
  async find(_id: string): Promise<T> {
    return this.model.findOne({ _id }).exec();
  }
  async findLogic(_id: string): Promise<T> {
    return this.model.findOne({ _id, deleted: false }).exec();
  }
}
