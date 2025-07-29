import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeetcodeProblem } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class LeetcodeProblemService extends EntityService<LeetcodeProblem> {
    constructor(
        @InjectRepository(LeetcodeProblem)
        repository: Repository<LeetcodeProblem>,
    ) {
        super(repository, LeetcodeProblem);
    }
}
