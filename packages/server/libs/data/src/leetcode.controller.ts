import { Controller, Get, Logger, Query } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/data/leetcode')
export class LeetcodeController {
    private readonly logger = new Logger(LeetcodeController.name);
    constructor(private readonly leetcodeService: LeetcodeService) {}

    @Get('problem/list')
    async getLeetcodeProblemList() {
        const data = await this.leetcodeService.getLeetcodeProblemList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('problem')
    async getLeetcodeProblems(@Query('name') name: string) {
        const data = await this.leetcodeService.getLeetcodeProblem({ name });
        return ResponseEntity.ofSuccess(data);
    }
}
