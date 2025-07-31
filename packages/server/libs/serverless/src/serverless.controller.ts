import {
    All,
    Body,
    Controller,
    Query,
    Headers,
    Req,
    Res,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessService } from './serverless.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@bestlyg-server/auth';

@Controller('/serverless')
@UseGuards(AuthGuard)
export class ServerlessController {
    constructor(private readonly serverlessService: ServerlessService) {}

    @All('call')
    async call(
        @Req() req: Request,
        @Res() res: Response,
        @Query('name') name: string,
        @Query() query: Record<string, any>,
        @Body() body: any,
        @Headers() headers: Record<string, any>,
    ) {
        const data = await this.serverlessService.call({ name, query, body, headers, req, res });
        return res.status(HttpStatus.OK).json(ResponseEntity.ofSuccess(data));
    }
}
