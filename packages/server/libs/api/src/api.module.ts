import { Module } from '@nestjs/common';
import { LeetcodeProblemModule } from '@bestlyg-server/database';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [LeetcodeProblemModule],
    controllers: [ClientController],
    providers: [ClientService],
})
export class ApiModule {}
