import { Module } from '@nestjs/common';
import { ServerlessController } from './serverless.controller';
import { ServerlessService } from './serverless.service';
import { AuthModule } from '../auth/index';

@Module({
    imports: [AuthModule],
    controllers: [ServerlessController],
    providers: [ServerlessService],
    exports: [ServerlessService],
})
export class ServerlessModule {}
