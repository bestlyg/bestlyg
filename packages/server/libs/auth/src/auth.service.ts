import { UserService } from '@bestlyg-server/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}
    async signIn(username: string, password: string) {
        const user = await this.userService.findOne({ where: { name: username } });
        if (!user || user.pwd !== password) throw new UnauthorizedException();
        const payload: Record<string, any> = omit(user, 'pwd');
        payload.accessToken = await this.jwtService.signAsync(payload);
        return payload;
    }
}
