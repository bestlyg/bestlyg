import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-5#removal-of-the-beforeexit-hook-from-the-library-engine
        // this.$on('beforeExit', async () => {
        //     await app.close();
        // });
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
