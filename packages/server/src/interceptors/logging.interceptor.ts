import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { isServerResponse, TimeRecorder } from '@bestlyg/server-shared';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
    private readonly maxLogLength = 20_000;

    private stringify(value: unknown) {
        if (value == null) return '';
        const visited = new WeakSet<object>();
        const text = JSON.stringify(value, (_key, item) => {
            if (typeof item === 'bigint') return item.toString();
            if (typeof item === 'object' && item !== null) {
                if (visited.has(item)) return '[Circular Reference]';
                visited.add(item);
            }
            return item;
        });
        if (!text) return '';
        return text.length > this.maxLogLength ? `${text.slice(0, this.maxLogLength)}...` : text;
    }

    private skip(request: Request) {
        const url = request.url || '';
        return [
            '/api/dev/log',
            '/api/static',
            '/static',
            '/web',
            '/assets',
            '/favicon',
            '.map',
            '.js',
            '.css',
            '.png',
            '.jpg',
            '.jpeg',
            '.svg',
            '.ico',
        ].some((item) => url.includes(item));
    }

    private shouldLogBody(request: Request) {
        const contentType = String(request.headers['content-type'] ?? '').toLowerCase();
        return contentType.includes('application/json') && request.body;
    }

    private isReadableStreamLike(value: unknown): value is NodeJS.ReadableStream {
        return Boolean(
            value &&
            typeof value === 'object' &&
            typeof (value as NodeJS.ReadableStream).pipe === 'function',
        );
    }

    private shouldLogResponse(response: Response, data: unknown) {
        if (
            !data ||
            isServerResponse(data) ||
            Buffer.isBuffer(data) ||
            this.isReadableStreamLike(data)
        )
            return false;
        const contentType = String(response.getHeader?.('content-type') ?? '').toLowerCase();
        const disposition = String(response.getHeader?.('content-disposition') ?? '').toLowerCase();
        return (
            !contentType.includes('text/event-stream') &&
            !contentType.includes('application/octet-stream') &&
            !disposition
        );
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const timeRecorder = new TimeRecorder();
        return next.handle().pipe(
            tap((data) => {
                if (this.skip(request)) return;
                const info = [
                    request.method,
                    request.url,
                    response.statusCode,
                    `${timeRecorder.accumulativeTotal()}ms`,
                    this.shouldLogBody(request) && `body=${this.stringify(request.body)}`,
                    this.shouldLogResponse(response, data) && `return=${this.stringify(data)}`,
                ]
                    .filter(Boolean)
                    .join(' ');
                this.logger.log(info);
            }),
        );
    }
}
