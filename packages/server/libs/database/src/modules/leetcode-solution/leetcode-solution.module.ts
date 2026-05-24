import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeetcodeSolutionController } from './leetcode-solution.controller';
import { LeetcodeSolution } from '../../entities';
import { LeetcodeSolutionService } from './leetcode-solution.service';

@Module({
    imports: [TypeOrmModule.forFeature([LeetcodeSolution])],
    controllers: [LeetcodeSolutionController],
    providers: [LeetcodeSolutionService],
    exports: [TypeOrmModule, LeetcodeSolutionService],
})
export class LeetcodeSolutionModule {}
