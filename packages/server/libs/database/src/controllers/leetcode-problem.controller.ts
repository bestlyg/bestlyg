import { Controller } from '@nestjs/common';
import { BaseController, BaseOptions } from './base.controller';
import { LeetcodeProblem } from '../entities';
import { LeetcodeProblemService } from '../services';

@Controller('/database/leetcode-problem')
export class LeetcodeProblemController extends BaseController<LeetcodeProblem> {
    constructor(readonly service: LeetcodeProblemService) {
        super(service);
    }

    protected async _findPageAndCount(opts: BaseOptions) {
        return super._findPageAndCount(opts, {
            relations: ['solutions'],
        });
    }
}
