import { Controller, Param, Post } from '@nestjs/common';
import { BaseController, BaseOptions } from './base.controller';
import { LeetcodeProblem } from '../entities';
import { LeetcodeProblemService } from '../services';
import { leetcode } from '@bestlyg-server/common';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/database/leetcode-problem')
export class LeetcodeProblemController extends BaseController<LeetcodeProblem> {
    constructor(
        readonly service: LeetcodeProblemService,
        private readonly leetcodeService: leetcode.LeetCodeService,
    ) {
        super(service);
    }

    protected async _findPageAndCount(opts: BaseOptions) {
        return super._findPageAndCount(opts, {
            relations: ['solutions'],
        });
    }

    protected async _findList(opts: BaseOptions) {
        return super._findList(opts, {
            relations: ['solutions'],
        });
    }

    protected async _findOne(opts: BaseOptions) {
        return super._findOne(opts, {
            relations: ['solutions'],
        });
    }

    protected async _find(opts: BaseOptions) {
        const { name } = opts.query;
        return super._find(opts, {
            relations: ['solutions'],
            where: { name },
        });
    }

    @Post('/slug/:slug')
    async createWithSlug(@Param('slug') slug: string) {
        console.log('logger', slug);
        const leetcode = await this.leetcodeService.getProblem(slug);
        console.log(leetcode);
        return ResponseEntity.ofSuccess(true);
    }
}
