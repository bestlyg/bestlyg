import { PageData, PageParam } from '@bestlyg/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export class EntityService<Entity extends BaseEntity> {
    constructor(
        public repository: Repository<Entity>,
        public entity: EntityTarget<Entity>,
    ) {}

    async create(...args: Parameters<typeof this.repository.create>) {
        return this.repository.create(...args);
    }

    async update(...args: Parameters<typeof this.repository.update>) {
        return this.repository.update(...args);
    }

    async save(...args: Parameters<typeof this.repository.save>) {
        return this.repository.save(...args);
    }

    async count(...args: Parameters<typeof this.repository.count>) {
        return this.repository.count(...args);
    }

    async delete(...args: Parameters<typeof this.repository.delete>) {
        return this.repository.delete(...args);
    }

    async findOne(...args: Parameters<typeof this.repository.findOne>) {
        return this.repository.findOne(...args);
    }

    async find(...args: Parameters<typeof this.repository.find>) {
        return this.repository.find(...args);
    }

    async findAndCount(...args: Parameters<typeof this.repository.findAndCount>) {
        return this.repository.findAndCount(...args);
    }

    async findPageAndCount(
        pageParam: PageParam,
        ...args: Parameters<typeof this.repository.findAndCount>
    ) {
        if (args[0]) {
            args[0].skip = pageParam.skip;
            args[0].take = pageParam.take;
        }
        const [list, total] = await this.repository.findAndCount(...args);
        return new PageData(list, total);
    }

    async exists(...args: Parameters<typeof this.repository.exists>) {
        return this.repository.exists(...args);
    }
}
