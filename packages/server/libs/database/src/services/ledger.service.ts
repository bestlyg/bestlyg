import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ledger } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class LedgerService extends EntityService<Ledger> {
    constructor(
        @InjectRepository(Ledger)
        repository: Repository<Ledger>,
    ) {
        super(repository, Ledger);
    }
}
