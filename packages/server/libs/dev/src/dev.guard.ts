import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class DevGuard implements CanActivate {
    private readonly secretKey = 'x-bestlyg-dev-key';

    constructor(private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        if (this.isDevModeEnabled()) return true;
        if (this.hasValidSecret(request)) return true;
        throw new UnauthorizedException();
    }

    private isDevModeEnabled() {
        return (
            this.configService.get('mode') === 'development' ||
            this.configService.get('server.devMode') === true ||
            this.configService.get('dev.enabled') === true
        );
    }

    private hasValidSecret(request: Request) {
        const secret = this.configService.get<string>('dev.secret')?.trim();
        if (!secret) return false;
        return this.extractSecret(request) === secret;
    }

    private extractSecret(request: Request) {
        const fromHeader = request.headers[this.secretKey] as string | undefined;
        const fromCookie = request.cookies?.[this.secretKey] as string | undefined;
        const fromQuery = request.query?.[this.secretKey] as string | undefined;
        const fromBody = (request.body as Record<string, unknown> | undefined)?.[this.secretKey];
        return (
            fromHeader ??
            fromCookie ??
            fromQuery ??
            (typeof fromBody === 'string' ? fromBody : undefined)
        );
    }
}
