import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';
import _ from 'lodash';
import {
    SelectServerlessCodeDto,
    CreateServerlessCodeDto,
    UpdateServerlessCodeDto,
    DeleteServerlessCodeDto,
} from '@bestlyg/common';

@Injectable()
export class ServerlessCodeService {
    private readonly logger = new Logger(ServerlessCodeService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getServerlessCode(dto: SelectServerlessCodeDto) {
        const data = await this.prismaService.serverlessCode.findFirst({
            where: _.pick(dto, ['id', 'name']),
        });
        return data;
    }

    async createServerlessCode(dto: CreateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.create({
            data: _.pick(dto, ['code', 'name', 'serverlessId']),
        });
        return res;
    }

    async updateServerlessCode(dto: UpdateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.update({
            where: { id: dto.id },
            data: _.pick(dto, ['id', 'name', 'code']),
        });
        return res;
    }

    async deleteServerlessCode(dto: DeleteServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.delete({
            where: {
                id: dto.id,
                name: dto.name,
            },
        });
        return res;
    }
}
