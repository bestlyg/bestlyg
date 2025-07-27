import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'xuan' })
export class Xuan extends BaseEntity {
    @Column({ type: 'timestamp', unique: true })
    date: Date;
    @Column({ type: 'int', nullable: true })
    weight?: number;
    @Column({ name: 'dance_times', type: 'int', nullable: true })
    danceTimes?: number;
}
