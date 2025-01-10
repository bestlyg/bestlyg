import { Controller, Logger } from '@nestjs/common';
import { FunctionModule } from './function-module.js';
import { prisma } from '../../utils/index.js';
@Controller('/api/serverless')
export class ServerlessService {
    private readonly logger = new Logger(ServerlessService.name);
    async call(globalCtx: {
        name: string;
        query: Record<string, any>;
        body: any;
        headers: Record<string, any>;
    }) {
        const data = await prisma.serverlessCode.findFirst({ where: { name: globalCtx.name } });
        if (!data) throw new Error(`Can not find the serverless code with name ${globalCtx.name}`);
        const module = new FunctionModule();
        const res = await module.compile(data.code, globalCtx);
        return res;
    }
}
