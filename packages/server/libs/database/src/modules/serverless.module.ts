import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serverless } from '../entities';
import { ServerlessService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([Serverless])],
    providers: [ServerlessService],
    exports: [TypeOrmModule, ServerlessService],
})
export class ServerlessModule {}
