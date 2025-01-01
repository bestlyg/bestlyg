import { Get, Controller, Param, Res } from '@nestjs/common';
import { resolve } from '../utils/index.js';
import { Response } from 'express';
import fs from 'fs-extra'

@Controller('/static')
export class StaticController {
    staticPath = resolve('node_modules', '@bestlyg/', 'static');
    @Get('*')
    async staticFile(@Param() params: string, @Res() res: Response) {
        const filePath = resolve(this.staticPath, params[0]);
        const exist = await fs.exists(filePath);
        if (!exist) throw new Error('inexistent file');
        return res.sendFile(filePath);
    }
}
