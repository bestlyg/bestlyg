import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger, UnprocessableEntityException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ResponseEntity } from '@bestlyg/common';
import { Request } from 'express';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    logger = new Logger(AllExceptionsFilter.name);
    // catch(exception: unknown, host: ArgumentsHost) {
    //     super.catch(exception, host);
    // }
    catch(exception: unknown, host: ArgumentsHost) {
        exception = this.formatZodError(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        const url = request.url;

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.OK;
        const msg =
            exception instanceof HttpException
                ? exception?.message
                : ((exception as any)?.message ?? exception?.toString() ?? 'Internal Server Error');
        this.logger.error(`${url} ${status} ${msg}`);
        response
            .status(status === HttpStatus.NOT_FOUND ? status : HttpStatus.OK)
            .json(ResponseEntity.ofFailure(msg, status));
    }

    formatZodError(exception: unknown) {
        if (exception instanceof ZodError) {
            const message = exception.errors
                .map(error => `${error.path.join('.')}: ${error.message}`)
                .join(', ');
            return new UnprocessableEntityException(`Input validation failed: ${message}`);
        }
        return exception;
    }
}
