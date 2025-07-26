import { Get, Controller, Res, Query, ParseBoolPipe } from '@nestjs/common';
import { Response } from 'express';
import { StaticService } from './static.service';

@Controller('/static')
export class StaticController {
    constructor(private readonly staticService: StaticService) {}
    @Get()
    async getStaticFile(
        @Query('p') path: string,
        @Query('r', ParseBoolPipe) read: boolean,
        @Res() res: Response,
    ) {
        return this.staticService.getStaticFile({
            path,
            read,
            res,
        });
    }
}
