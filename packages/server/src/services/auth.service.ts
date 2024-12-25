import { USERNAME, PASSWORD } from '../utils/index.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    async signIn(username: string, password: string) {
        console.log('SIGN', username, password);
        if (username !== USERNAME || password !== PASSWORD) {
            throw new UnauthorizedException();
        }
        const payload = { username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
