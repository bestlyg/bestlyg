import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secrets } from '../entities';
import { SecretsService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([Secrets])],
    providers: [SecretsService],
    exports: [TypeOrmModule, SecretsService],
})
export class SecretsModule {}
