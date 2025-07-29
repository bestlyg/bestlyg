import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'casbin_rule' })
export class CasbinRule extends BaseEntity {
    @Column({ type: 'text' })
    ptype: string;

    @Column({ type: 'text' })
    p0: string;

    @Column({ type: 'text' })
    p1: string;

    @Column({ type: 'text' })
    p2: string;

    @Column({ type: 'text' })
    p3: string;

    @Column({ type: 'text' })
    p4: string;

    @Column({ type: 'text' })
    p5: string;
}
