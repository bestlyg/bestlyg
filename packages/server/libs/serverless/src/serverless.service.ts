import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { FunctionModuleService } from '@bestlyg-server/common';

@Injectable()
export class ServerlessService {
    private readonly logger = new Logger(ServerlessService.name);
    constructor(
        // private readonly prismaService: PrismaService,
        private readonly functionModuleService: FunctionModuleService,
    ) {}
    async call(globalCtx: {
        name: string;
        query: Record<string, any>;
        body: any;
        headers: Record<string, any>;
        req: Request;
        res: Response;
    }) {
        // const data = await this.prismaService.serverlessCode.findFirst({
        //     where: { name: globalCtx.name },
        // });
        // if (!data) throw new Error(`Can not find the serverless code with name ${globalCtx.name}`);
        // const res = await this.functionModuleService.compile(data.code, globalCtx);
        // return res;
    }
}
