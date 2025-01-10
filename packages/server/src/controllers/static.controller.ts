import { Get, Controller, Param, Res } from '@nestjs/common';
import { resolve } from '../utils/index.js';
import { Response } from 'express';
import { ResponseEntity } from '@bestlyg/common';
import fs from 'fs-extra';

@Controller('/static')
export class StaticController {
    private readonly staticPath = resolve('node_modules', '@bestlyg/', 'static');
    @Get('*')
    async staticFile(@Param() params: string, @Res() res: Response) {
        const filePath = resolve(this.staticPath, params[0]);
        const exist = await fs.exists(filePath);
        if (!exist) return res.status(404).json(ResponseEntity.ofFailure('Inexistent file'));
        return res.sendFile(filePath);
    }
}
