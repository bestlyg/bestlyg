import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { RemoteFunctionCallService } from '@bestlyg-server/common';
import { ServerlessService as ServerlessDBService } from '@bestlyg-server/database';

@Injectable()
export class ServerlessService {
    constructor(
        private readonly serverlessService: ServerlessDBService,
        private readonly remoteFunctionCallService: RemoteFunctionCallService,
    ) {}
    async call(globalCtx: {
        name: string;
        query: Record<string, any>;
        body: any;
        headers: Record<string, any>;
        req: Request;
        res: Response;
    }) {
        const data = await this.serverlessService.findOne({
            where: { name: globalCtx.name },
        });
        if (!data) throw new Error(`Can not find the serverless code with name ${globalCtx.name}`);
        const res = await this.remoteFunctionCallService.compile(data.code, globalCtx);
        return res;
    }
}
