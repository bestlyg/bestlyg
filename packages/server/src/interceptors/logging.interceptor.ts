import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const request: Request = context.switchToHttp().getRequest();
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                this.logger.log(`${request.method} ${request.url} ${Date.now() - now}ms`);
            }),
        );
    }
}
