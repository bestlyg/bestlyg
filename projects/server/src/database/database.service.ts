import { Document, Model } from 'mongoose';
import { RequestFilter, RequestFilterTag, RequestFind, RequestSort, RequestPage } from '@/models';
import { isNumber, isString, isBoolean } from 'lodash';

export class BaseDataBaseService<T extends Document, Schema> {
  constructor(protected readonly model: Model<T>) {}
  async create(dto: Schema): Promise<T> {
    return new this.model(dto).save();
  }
  async findAll({ filter, sort }: RequestFind<T>): Promise<T[]> {
    return this.model.find(this.getFilterRecord(filter)).sort(this.getSortRecord(sort)).exec();
  }
  async findPage({ model, current, size }: RequestPage<T>): Promise<{ data: T[]; total: number }> {
    return Promise.all([
      this.model
        .find(this.getFilterRecord(model?.filter))
        .skip(this.getPageSkip(current, size))
        .limit(size)
        .sort(this.getSortRecord(model?.sort))
        .exec(),
      this.model
        .find(this.getFilterRecord(model?.filter))
        .sort(this.getSortRecord(model?.sort))
        .count()
        .exec(),
    ]).then(([data, total]) => ({ data, total }));
  }
  async update(id: string, model: Partial<Schema>) {
    return this.model.updateOne({ _id: id } as any, { $set: model } as any).exec();
  }
  async remove(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } } as any).exec();
  }
  async clear() {
    return this.model.deleteMany({}).exec();
  }
  protected getFilterRecord(filter: RequestFilter<T> = {}) {
    const findItem: any = {};
    if (filter) {
      Object.entries(filter).forEach(([key, item]) => {
        if (isString(item) || isNumber(item) || isBoolean(key)) {
          findItem[key] = item;
        } else if (item.tag) {
          switch (item.tag) {
            case RequestFilterTag.DATE: {
              findItem[key] = { $gte: item.start, $lte: item.end };
              break;
            }
            case RequestFilterTag.NUMBER: {
              findItem[key] = { $gte: item.min, $lte: item.max };
              break;
            }
            case RequestFilterTag.STRING: {
              findItem[key] = item.fuzzy ? { $regex: new RegExp(item.value) } : item.value;
              break;
            }
            default:
              break;
          }
        }
      });
    }
    return findItem;
  }
  protected getSortRecord(sort?: RequestSort<T>) {
    return sort ? { [sort.key]: sort.rule } : {};
  }
  protected getPageSkip(current: number, size: number): number {
    return (current - 1) * size;
  }
}
