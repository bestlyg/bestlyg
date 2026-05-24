import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretsController } from './secrets.controller';
import { Secrets } from '../../entities';
import { SecretsService } from './secrets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Secrets])],
    controllers: [SecretsController],
    providers: [SecretsService],
    exports: [TypeOrmModule, SecretsService],
})
export class SecretsModule {}
