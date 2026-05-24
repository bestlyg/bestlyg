import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { leetcode } from '@bestlyg-server/common';
import { LeetcodeProblemController } from './leetcode-problem.controller';
import { LeetcodeProblem } from '../../entities';
import { LeetcodeProblemService } from './leetcode-problem.service';

@Module({
    imports: [TypeOrmModule.forFeature([LeetcodeProblem])],
    controllers: [LeetcodeProblemController],
    providers: [LeetcodeProblemService, leetcode.LeetCodeService],
    exports: [TypeOrmModule, LeetcodeProblemService],
})
export class LeetcodeProblemModule {}
