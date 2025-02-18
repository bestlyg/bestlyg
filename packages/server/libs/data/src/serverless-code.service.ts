import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';
import {
    CreateServerlessCodeDto,
    DeleteServerlessCodeDto,
    SelectServerlessCodeDto,
    UpdateServerlessCodeDto,
} from './serverless-code.dto';

@Injectable()
export class ServerlessCodeService {
    private readonly logger = new Logger(ServerlessCodeService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getServerlessCode(dto: SelectServerlessCodeDto) {
        const data = await this.prismaService.serverlessCode.findFirst({ where: dto });
        return data;
    }

    async createServerlessCode(dto: CreateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.create({ data: dto });
        return res;
    }

    async updateServerlessCode(dto: UpdateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.update({
            where: { id: dto.id },
            data: dto,
        });
        return res;
    }

    async deleteServerlessCode(dto: DeleteServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.delete({
            where: dto as any,
        });
        return res;
    }
}
