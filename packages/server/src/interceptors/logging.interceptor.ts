import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const info = [
                    request.method,
                    request.url,
                    `${Date.now() - now}ms`,
                    request.body && JSON.stringify(request.body),
                ]
                    .filter(Boolean)
                    .join(' ');
                this.logger.log(info);
            }),
        );
    }
}
