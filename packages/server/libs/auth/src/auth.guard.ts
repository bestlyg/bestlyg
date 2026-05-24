import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly clsService: ClsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const SECRET = this.configService.get('jwt.secret');
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: SECRET });
            // 💡 在这里我们将 payload 挂载到请求对象上
            // 以便我们可以在路由处理器中访问它
            request['user'] = payload;
            this.clsService.set('user', payload);
            this.clsService.set(
                'username',
                payload?.name ?? payload?.username ?? payload?.nickname ?? '',
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers['authorization'] as string)?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
