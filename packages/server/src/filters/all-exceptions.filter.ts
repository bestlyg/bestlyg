import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    // catch(exception: unknown, host: ArgumentsHost) {
    //     super.catch(exception, host);
    // }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const msg =
            exception instanceof HttpException
                ? exception?.message
                : ((exception as any)?.message ?? exception?.toString() ?? 'Internal Server Error');
        response.status(200).json({
            code: status,
            path: request.url,
            msg,
        });
    }
}
