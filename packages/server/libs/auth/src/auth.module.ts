import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { UserModule } from '@bestlyg-server/database';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
