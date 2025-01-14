import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs-extra';
import { resolve } from '@bestlyg-server/common';

@Injectable()
export class StaticService {
    private readonly staticPath = resolve('node_modules', '@bestlyg/', 'static');
    async getStaticFile(params: string[], res: Response) {
        const filePath = resolve(this.staticPath, params[0]);
        const exist = await fs.exists(filePath);
        if (!exist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        return res.sendFile(filePath);
    }
}
