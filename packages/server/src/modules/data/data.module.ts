import { Module } from '@nestjs/common';
import { DataService } from './data.service.js';
import { PrismaService } from './prisma.service.js';
import { DataController } from './data.controller.js';

@Module({
    controllers: [DataController],
    providers: [DataService, PrismaService],
    exports: [DataService, PrismaService],
})
export class DataModule {}
