import { Entity, Column } from 'typeorm';
import { LedgerType, LedgerFrom } from './enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'ledger' })
export class Ledger extends BaseEntity {
    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'int4' })
    balance: number;

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'bool' })
    io: boolean;

    @Column({ type: 'enum', enum: LedgerFrom, nullable: true })
    from?: LedgerFrom;

    @Column({ type: 'text', nullable: true })
    bank?: string;

    @Column({ type: 'enum', enum: LedgerType })
    type: LedgerType;
}
