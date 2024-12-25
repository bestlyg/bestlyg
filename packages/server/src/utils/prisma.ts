import { prismaClient } from '@bestlyg/data';

export const prisma: InstanceType<typeof prismaClient.PrismaClient> =
    new prismaClient.PrismaClient();
