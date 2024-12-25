import { Get, Controller, Param, Res } from '@nestjs/common';
import { BaseController } from './base.controller.js';
import { resolve } from '../utils/index.js';
import { Response } from 'express';
import best from '@bestlyg/cli';

@Controller('/static')
export class StaticController extends BaseController {
    staticPath = resolve('node_modules', '@bestlyg/', 'static');
    @Get('*')
    async staticFile(@Param() params: string, @Res() res: Response) {
        const filePath = resolve(this.staticPath, params[0]);
        const exist = await best.zx.fs.exists(filePath);
        console.log('File', filePath, exist);
        if (!exist) {
            const data = await this.reject('inexistent file');
            return res.send(data);
        }
        return res.sendFile(filePath);
    }
}
