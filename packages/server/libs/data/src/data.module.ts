import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { PrismaService } from '@bestlyg-server/common';

@Module({
    controllers: [DataController],
    providers: [DataService, PrismaService],
    exports: [DataService],
})
export class DataModule {}
