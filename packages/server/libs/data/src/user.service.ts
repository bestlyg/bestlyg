import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getUserList() {
        return this.prismaService.user.findMany({ select: { id: true, name: true } });
    }
}
