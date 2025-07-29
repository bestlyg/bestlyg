import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secrets } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class SecretsService extends EntityService<Secrets> {
    constructor(
        @InjectRepository(Secrets)
        repository: Repository<Secrets>,
    ) {
        super(repository, Secrets);
    }
}
