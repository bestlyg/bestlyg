import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Xuan } from '../entities';
import { XuanService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([Xuan])],
    providers: [XuanService],
    exports: [TypeOrmModule, XuanService],
})
export class XuanModule {}
