import { Module } from '@nestjs/common';
import { PrismaService } from '@bestlyg-server/common';
import { DatabaseModule } from '@bestlyg-server/database';
import { ServerlessCodeController } from './serverless-code.controller';
import { ServerlessCodeService } from './serverless-code.service';
import { ServerlessController } from './serverless.controller';
import { ServerlessService } from './serverless.service';
import { LedgerController } from './ledger.controller';
import { LeetcodeController } from './leetcode.controller';
import { LeetcodeService } from './leetcode.service';
import { UserController } from './user.controller';
import { XuanController } from './xuan.controller';
import { XuanService } from './xuan.service';
import { SecretsController } from './secrets.controller';
import { SecretsService } from './secrets.service';

@Module({
    imports: [DatabaseModule],
    controllers: [
        // ServerlessCodeController,
        // ServerlessController,
        LedgerController,
        // LeetcodeController,
        UserController,
        // XuanController,
        // SecretsController,
    ],
})
export class DataModule {}
