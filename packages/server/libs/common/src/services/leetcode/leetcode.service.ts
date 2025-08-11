import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LeetCode } from './leetcode';

@Injectable()
export class LeetCodeService {
    leetcode: LeetCode;

    constructor(private readonly configService: ConfigService) {
        const csrf = this.configService.get('leetcode.csrf');
        const session = this.configService.get('leetcode.session');
        this.leetcode = new LeetCode({
            credential: {
                csrf,
                session,
            },
        });
    }

    async getProblem(slug: string) {
        return this.leetcode.getProblem(slug);
    }
}
