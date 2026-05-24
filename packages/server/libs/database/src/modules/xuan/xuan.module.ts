import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XuanController } from './xuan.controller';
import { Xuan } from '../../entities';
import { XuanService } from './xuan.service';

@Module({
    imports: [TypeOrmModule.forFeature([Xuan])],
    controllers: [XuanController],
    providers: [XuanService],
    exports: [TypeOrmModule, XuanService],
})
export class XuanModule {}
