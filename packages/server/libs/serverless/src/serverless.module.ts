import { Module } from '@nestjs/common';
import { ServerlessController } from './serverless.controller';
import { ServerlessService } from './serverless.service';
import { AuthModule } from '@bestlyg-server/auth';
import { ServerlessModule as ServerlessDBModule } from '@bestlyg-server/database';
import { RemoteFunctionCallService } from '@bestlyg-server/common';

@Module({
    imports: [AuthModule, ServerlessDBModule],
    controllers: [ServerlessController],
    providers: [ServerlessService, RemoteFunctionCallService],
    exports: [ServerlessService],
})
export class ServerlessModule {}
