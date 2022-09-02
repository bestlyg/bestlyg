import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { database } from '@/modules';
import { WechatService } from '@/services';
import { LoginWechatDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: database.UserService,
    private readonly wechatService: WechatService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async loginWechat(dto: LoginWechatDto) {
    const session = await this.wechatService.code2Session(dto.code);
    let user = await this.userService.findLogic({
      wechatOpenId: session.openid,
    });
    if (!user) {
      const data = this.wechatService.decryptData<{
        nickName: string;
        gender: number;
        avatarUrl: string;
      }>(session.session_key, dto.encryptedData, dto.iv);
      user = await this.userService.create({
        name: data.nickName,
        gender: data.gender,
        avatar: data.avatarUrl,
        wechatOpenId: session.openid,
        roleKey: database.RoleEnum.User,
      });
    }
    return {
      accessToken: this.jwtService.sign(user.toObject()),
      ...user.toObject(),
    };
  }
}
