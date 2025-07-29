import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { LeetcodeSolution } from '../entities';
import { LeetcodeSolutionService } from '../services';

@Controller('/database/leetcode-solution')
export class LeetcodeSolutionController extends BaseController<LeetcodeSolution> {
    constructor(readonly service: LeetcodeSolutionService) {
        super(service);
    }
}
