import { UserService } from '@bestlyg-server/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService , private readonly userService : UserService) {}
    async signIn(username: string, password: string) {
        const user = await this.userService.findOne({ where: { name: username } });
        if (!user || user.pwd !== password) throw new UnauthorizedException();
        const payload = {
            username: user.name,
            nickname: user.nickname,
            description: user.description,
            avatar: user.avatar,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
            ...payload,
        };
    }
}
