import { Module } from '@nestjs/common';
// import { DataModule } from '@bestlyg-server/data';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    // imports: [DataModule],
    controllers: [ApiController, ClientController],
    providers: [ApiService, ClientService],
})
export class ApiModule {}
