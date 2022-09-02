import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules';
import { WechatService } from '@/services';
import { LoginWechatDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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
    const token = await this.wechatService.getAccessToken();
    const session = await this.wechatService.code2Session(dto.code);
    const user = await this.userService.findLogic({
      wechatUnionId: session.unionid,
    });
    if (user) return user;
    const data = await this.wechatService.decryptData(
      session.session_key,
      dto.encryptedData,
      dto.iv,
    );
    console.log(data);
    return {
      access_token: this.jwtService.sign({ username: 1 }),
    };
  }
}
