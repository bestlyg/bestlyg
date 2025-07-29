import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeetcodeSolution } from '../entities';
import { LeetcodeSolutionService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([LeetcodeSolution])],
    providers: [LeetcodeSolutionService],
    exports: [TypeOrmModule, LeetcodeSolutionService],
})
export class LeetcodeSolutionModule {}
