import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { BaseController } from './base.controller.js';

@Controller('/api/auth')
export class AuthController extends BaseController {
    constructor(private authService: AuthService) {
        super();
    }

    @Post('login')
    signIn(@Body() signInDto: { username: string; password: string }) {
        return this.of(() => this.authService.signIn(signInDto.username, signInDto.password));
    }
}
