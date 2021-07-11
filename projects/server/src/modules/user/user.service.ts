import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto, FindUserDto, UpdateUserDto } from './user.dto';
import { FindAllDto, FindPageDto, FindSort, FindFilterTag, FindFilter } from '@/base';

@Injectable()
export class UserService {
  constructor(@Inject('User_MODEL') protected readonly userModel: Model<User>) {}
  async create(dto: CreateUserDto): Promise<User> {
    return new this.userModel(dto).save();
  }
  async findAll({ filter, sort }: FindAllDto<FindUserDto>): Promise<User[]> {
    return this.userModel.find(this.getFilterRecord(filter)).sort(this.getSortRecord(sort)).exec();
  }
  async findPage({
    model,
    current,
    size,
  }: FindPageDto<FindUserDto>): Promise<{ data: User[]; total: number }> {
    return Promise.all([
      this.userModel
        .find(this.getFilterRecord(model?.filter))
        .skip(this.getPageSkip(current, size))
        .limit(size)
        .sort(this.getSortRecord(model?.sort))
        .exec(),
      this.userModel
        .find(this.getFilterRecord(model?.filter))
        .sort(this.getSortRecord(model?.sort))
        .count()
        .exec(),
    ]).then(([data, total]) => ({ data, total }));
  }
  async update(id: string, userModel: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id } as any, { $set: userModel } as any).exec();
  }
  async remove(ids: string[]) {
    return this.userModel.deleteMany({ _id: { $in: ids } } as any).exec();
  }
  async clear() {
    return this.userModel.deleteMany({}).exec();
  }
  protected getFilterRecord(filter: FindFilter[]) {
    return (
      filter?.reduce<Record<string, any>>(
        (record, { key, tag, value, start, end, max, min, fuzzy }) => {
          if (tag === FindFilterTag.COMMON) {
            record[key] = value;
          } else if (tag === FindFilterTag.DATE) {
            record[key] = {
              $gte: start,
              $lte: end,
            };
          } else if (tag === FindFilterTag.NUMBER) {
            record[key] = {
              $gte: min,
              $lte: max,
            };
          } else if (tag === FindFilterTag.STRING) {
            record[key] = fuzzy ? { $regex: new RegExp(value) } : value;
          }
          return record;
        },
        {}
      ) ?? []
    );
  }
  protected getSortRecord(sort?: FindSort<FindUserDto>) {
    return sort ? { [sort.key]: sort.rule } : {};
  }
  protected getPageSkip(current: number, size: number): number {
    return (current - 1) * size;
  }
}
