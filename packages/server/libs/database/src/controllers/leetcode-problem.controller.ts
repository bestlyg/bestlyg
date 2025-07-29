import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { LeetcodeProblem } from '../entities';
import { LeetcodeProblemService } from '../services';

@Controller('/database/leetcode-problem')
export class LeetcodeProblemController extends BaseController<LeetcodeProblem> {
    constructor(readonly service: LeetcodeProblemService) {
        super(service);
    }
}
