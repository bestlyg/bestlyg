import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LeetcodeLevelType, LeetcodeScriptType } from './enums';

@Entity({ name: 'leetcode_problem' })
export class LeetcodeProblem extends BaseEntity {
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    url: string;

    @Column({ type: 'text' })
    desc: string;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @Column({ type: 'enum', enum: LeetcodeLevelType })
    level: LeetcodeLevelType;

    @OneToMany(() => LeetcodeSolution, (solution) => solution.problem, { cascade: true })
    solutions: LeetcodeSolution[];
}

@Entity({ name: 'leetcode_solution' })
export class LeetcodeSolution extends BaseEntity {
    @Column({ type: 'enum', enum: LeetcodeScriptType })
    script: LeetcodeScriptType;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'float8', nullable: true })
    time: number;

    @Column({ type: 'float8', nullable: true })
    memory: number;

    @Column({ type: 'text' })
    desc: string;

    @Column({ type: 'text' })
    code: string;

    @ManyToOne(() => LeetcodeProblem, (problem) => problem.solutions)
    problem: LeetcodeProblem;
}
