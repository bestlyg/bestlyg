import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'secrets' })
export class Secrets extends BaseEntity {
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    data: string;
}
