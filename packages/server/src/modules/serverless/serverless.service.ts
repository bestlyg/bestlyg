import { Controller, Logger } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { FunctionModule } from './function-module.js';

const tempCode2 = `
while (true);
const a = 1;
const b = 2;
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
