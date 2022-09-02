import { BaseController } from '@/base';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginWechatDto } from './dto';

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
  async loginCommon(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
