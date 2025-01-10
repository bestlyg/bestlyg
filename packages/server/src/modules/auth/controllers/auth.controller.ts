import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Body() signInDto: { username: string; password: string }) {
        const data = await this.authService.signIn(signInDto.username, signInDto.password);
        return ResponseEntity.ofSuccess(data);
    }
}
