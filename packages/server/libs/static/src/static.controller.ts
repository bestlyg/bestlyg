import { Get, Controller, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from '@bestlyg-server/common';
import fs from 'fs-extra';
import { StaticService } from './static.service';

@Controller('/static')
export class StaticController {
    constructor(private readonly staticService: StaticService) {}
    @Get('*')
    async getStaticFile(@Param() params: string[], @Res() res: Response) {
        return this.staticService.getStaticFile(params, res);
    }
}
