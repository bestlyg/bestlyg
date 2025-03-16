import { Controller, Post, Body, Res, MessageEvent } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, Observable } from 'rxjs';
import { Response } from 'express';
import { ResponseEntity, sse } from '@bestlyg/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('sse')
    async sse(
        @Res() res: Response,
        @Body()
        body: {
            data: string;
            endIdx?: number;
            startIdx?: number;
            offset?: number;
            pickLength?: number;
            sleepTime: number;
        },
    ) {
        const {
            data,
            startIdx = 0,
            endIdx = data.length,
            offset = 1,
            pickLength = 1,
            sleepTime,
        } = body;
        res.set(sse.defaultResponseHeaders);
        res.flushHeaders();
        for (let i = startIdx; i < endIdx; i = i + offset) {
            res.write(
                sse.stringify({
                    id: Date.now().toString(),
                    data: JSON.stringify(ResponseEntity.ofSuccess(data.substring(i, i + pickLength))),
                }),
            );
            res.flush();
            if (sleepTime) await new Promise(r => setTimeout(r, sleepTime));
        }
        res.end();
    }
    // @Get()
    // @Redirect('/web/site')
    // redirect() {}

    // @Get('/favicon.ico')
    // @Redirect('/static/logo.ico')
    // redirectFavicon() {}
}
