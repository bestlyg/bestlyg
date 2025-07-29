import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serverless } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class ServerlessService extends EntityService<Serverless> {
    constructor(
        @InjectRepository(Serverless)
        repository: Repository<Serverless>,
    ) {
        super(repository, Serverless);
    }
}
