import { Module } from '@nestjs/common';
import { PrismaService } from '@bestlyg-server/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, PrismaService],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
