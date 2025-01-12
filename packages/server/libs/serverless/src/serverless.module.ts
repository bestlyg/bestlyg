import { Module } from '@nestjs/common';
import { ServerlessController } from './serverless.controller';
import { ServerlessService } from './serverless.service';
import { AuthModule } from '@bestlyg-server/auth';
import { PrismaService } from '@bestlyg-server/common';

@Module({
    imports: [AuthModule],
    controllers: [ServerlessController],
    providers: [ServerlessService, PrismaService],
    exports: [ServerlessService],
})
export class ServerlessModule {}
