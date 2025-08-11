import { Module } from '@nestjs/common';
import * as modules from './modules';
import * as controllers from './controllers';
import { LeetCodeService } from '@bestlyg-server/common';

@Module({
    imports: Object.values(modules),
    controllers: Object.values(controllers),
    exports: Object.values(modules),
    providers: [LeetCodeService],
})
export class DatabaseModule {}
