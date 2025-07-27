import { Module } from '@nestjs/common';
import * as modules from './modules';

@Module({
    imports: Object.values(modules),
    exports: Object.values(modules),
})
export class DatabaseModule {}
