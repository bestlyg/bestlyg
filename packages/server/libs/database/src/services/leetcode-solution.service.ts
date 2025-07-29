import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeetcodeSolution } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class LeetcodeSolutionService extends EntityService<LeetcodeSolution> {
    constructor(
        @InjectRepository(LeetcodeSolution)
        repository: Repository<LeetcodeSolution>,
    ) {
        super(repository, LeetcodeSolution);
    }
}
