import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'serverless' })
export class Serverless extends BaseEntity {
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    code: string;
}
