import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CasbinRule } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class CasbinRuleService extends EntityService<CasbinRule> {
    constructor(
        @InjectRepository(CasbinRule)
        repository: Repository<CasbinRule>,
    ) {
        super(repository, CasbinRule);
    }
}
