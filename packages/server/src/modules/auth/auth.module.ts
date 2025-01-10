import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service.js';
import { AuthGuard } from './guards/auth.guard.js';
import { AuthController } from './controllers/auth.controller.js';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
