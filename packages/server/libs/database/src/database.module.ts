import { Module } from '@nestjs/common';
import { databaseResourceModules } from './modules';
import './upload-file-exception';

@Module({
    imports: databaseResourceModules,
    exports: databaseResourceModules,
})
export class DatabaseModule {}
