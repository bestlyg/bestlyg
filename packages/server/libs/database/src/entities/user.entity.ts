import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    pwd: string;

    @Column({ type: 'text' })
    avatar: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    nickname: string;
}
