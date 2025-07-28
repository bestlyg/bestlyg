import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { EntityService } from './entity.service';

@Injectable()
export class UserService extends EntityService<User> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(repository, User);
    }
}
