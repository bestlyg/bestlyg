import { Module } from '@nestjs/common';
import * as modules from './modules';
import * as controllers from './controllers';
import { leetcode } from '@bestlyg-server/common';

@Module({
    imports: Object.values(modules),
    controllers: Object.values(controllers),
    exports: Object.values(modules),
    providers: [leetcode.LeetCodeService],
})
export class DatabaseModule {}
