import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs-extra';
import { resolve } from '@bestlyg-server/common';
import { ResponseEntity } from '@bestlyg/common';

@Injectable()
export class StaticService {
    private readonly staticPath = resolve('node_modules', '@bestlyg/', 'static');
    async getStaticFile({ read, path, res }: { read: boolean; path: string; res: Response }) {
        const filePath = resolve(this.staticPath, path);
        const exist = await fs.exists(filePath);
        if (!exist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        if (read) {
            const data = await fs.readFile(filePath, 'utf8');
            return res.status(HttpStatus.OK).json(ResponseEntity.ofSuccess(data));
        }
        return res.sendFile(filePath);
    }
}
