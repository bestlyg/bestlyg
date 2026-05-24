import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerlessController } from './serverless.controller';
import { Serverless } from '../../entities';
import { ServerlessService } from './serverless.service';

@Module({
    imports: [TypeOrmModule.forFeature([Serverless])],
    controllers: [ServerlessController],
    providers: [ServerlessService],
    exports: [TypeOrmModule, ServerlessService],
})
export class ServerlessModule {}
