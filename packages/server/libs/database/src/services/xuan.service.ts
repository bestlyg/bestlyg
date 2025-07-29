import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Xuan } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class XuanService extends EntityService<Xuan> {
    constructor(
        @InjectRepository(Xuan)
        repository: Repository<Xuan>,
    ) {
        super(repository, Xuan);
    }
}
