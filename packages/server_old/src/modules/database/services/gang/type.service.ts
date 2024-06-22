import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDatabaseService } from '../base.service';
import { GangType, GangTypeName } from '../../schemas';

@Injectable()
export class GangTypeService extends BaseDatabaseService<GangType> {
  constructor(@InjectModel(GangTypeName) model: Model<GangType>) {
    super(model);
  }
}
