import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar' })
    pwd: string;

    @Column({ type: 'varchar' })
    nickname: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar' })
    avatar: string;
}
