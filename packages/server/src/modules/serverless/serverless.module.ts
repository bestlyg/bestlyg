import { Module } from '@nestjs/common';
import { ServerlessController } from './serverless.controller.js';
import { ServerlessService } from './serverless.service.js';
import { AuthModule } from '../auth/index.js';

@Module({
    imports: [AuthModule],
    controllers: [ServerlessController],
    providers: [ServerlessService],
    exports: [ServerlessService],
})
export class ServerlessModule {}
