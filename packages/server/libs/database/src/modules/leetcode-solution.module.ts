import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeetcodeProblem } from '../entities';
import { LeetcodeProblemService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([LeetcodeProblem])],
    providers: [LeetcodeProblemService],
    exports: [TypeOrmModule, LeetcodeProblemService],
})
export class LeetcodeProblemModule {}
