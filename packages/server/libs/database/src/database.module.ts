import { Module } from '@nestjs/common';
import * as modules from './modules';
import * as controllers from './controllers';

@Module({
    imports: Object.values(modules),
    controllers: Object.values(controllers),
    exports: Object.values(modules),
})
export class DatabaseModule {}
