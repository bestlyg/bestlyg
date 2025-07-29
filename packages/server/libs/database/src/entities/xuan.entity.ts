import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'xuan' })
export class Xuan extends BaseEntity {
    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'int4', nullable: true })
    weight: number;

    @Column({ type: 'int4', nullable: true })
    dance_times: number;
}
