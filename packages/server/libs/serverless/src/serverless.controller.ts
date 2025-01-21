import {
    All,
    Body,
    Controller,
    Logger,
    Query,
    Headers,
    Req,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessService } from './serverless.service';
import { Request, Response } from 'express';

@Controller('/serverless')
export class ServerlessController {
    private readonly logger = new Logger(ServerlessController.name);
    constructor(private readonly serverlessService: ServerlessService) {}

    // @UseGuards(AuthGuard)
    @All('call')
    async call(
        @Req() req: Request,
        @Res() res: Response,
        @Query('name') name: string,
        @Query() query: Record<string, any>,
        @Body() body: any,
        @Headers() headers: Record<string, any>,
    ) {
        this.logger.log(`name = ${name}`);
        const data = await this.serverlessService.call({ name, query, body, headers, req, res });
        return res.status(HttpStatus.OK).json(ResponseEntity.ofSuccess(data));
    }
}
