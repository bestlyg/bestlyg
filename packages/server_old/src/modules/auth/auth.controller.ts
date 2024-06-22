import { BaseController } from '@/base';
import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto, LoginWechatDto } from './dto';

@Controller('/auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/wechat')
  async loginWechat(@Body() dto: LoginWechatDto) {
    return this.result(this.authService.loginWechat(dto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async loginCommon(@Req() req: Request) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request & { user: AuthDto }) {
    return req.user;
  }
}
