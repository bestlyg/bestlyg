import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    async signIn(username: string, password: string) {
        const USERNAME = this.configService.get('user.username');
        const PASSWORD = this.configService.get('user.password');
        if (username !== USERNAME || password !== PASSWORD) throw new UnauthorizedException();
        const payload = { username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
