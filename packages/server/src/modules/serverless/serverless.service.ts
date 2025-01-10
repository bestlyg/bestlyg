import { Controller, Logger } from '@nestjs/common';
import { FunctionModule } from './function-module.js';

const tempCode2 = `
const res = Promise.withResolvers();
console.log(res)
const a:number = 1;
const b:any = 2;
resolve(a + b + 'LYG');
`;

@Controller('/api/serverless')
export class ServerlessService {
    private readonly logger = new Logger(ServerlessService.name);
    async call(name: string) {
        const module = new FunctionModule();
        const res = await module.compile(tempCode2);
        return res;
    }
}
