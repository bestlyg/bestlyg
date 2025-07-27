import {
    BaseEntity as TypeormBaseEntity,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ name: 'create_time' })
    createdTime: Date;
    @UpdateDateColumn({ name: 'update_time' })
    updatedTime: Date;
}
