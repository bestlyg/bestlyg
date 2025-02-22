import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from '@bestlyg-server/common';
import { PageParam, PageData } from '@bestlyg/common';
import { Ledger } from '@bestlyg/common/prisma-client';

@Injectable()
export class DataService {
    constructor(private readonly prismaService: PrismaService) {}
}
