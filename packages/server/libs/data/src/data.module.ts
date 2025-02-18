import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { PrismaService } from '@bestlyg-server/common';
import { ServerlessCodeController } from './serverless-code.controller';
import { ServerlessCodeService } from './serverless-code.service';
import { ServerlessController } from './serverless.controller';
import { ServerlessService } from './serverless.service';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { LeetcodeController } from './leetcode.controller';
import { LeetcodeService } from './leetcode.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [
        DataController,
        ServerlessCodeController,
        ServerlessController,
        LedgerController,
        LeetcodeController,
        UserController,
    ],
    providers: [
        DataService,
        PrismaService,
        ServerlessCodeService,
        ServerlessService,
        LedgerService,
        LeetcodeService,
        UserService,
    ],
    exports: [
        DataService,
        PrismaService,
        ServerlessCodeService,
        ServerlessService,
        LedgerService,
        LeetcodeService,
        UserService,
    ],
})
export class DataModule {}
