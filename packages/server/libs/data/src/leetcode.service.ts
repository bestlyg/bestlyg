import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LeetcodeService {
    private readonly logger = new Logger(LeetcodeService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getLeetcodeProblem({ name }: { name: string }) {
        name = name.split('/').at(-1)!;
        const data = await this.prismaService.leetcodeProblem.findFirst({
            include: { solutions: {} },
            where: { name },
        });
        return data;
    }

    async getLeetcodeProblemList() {
        const data = await this.prismaService.leetcodeProblem.findMany();
        return data;
    }

}
