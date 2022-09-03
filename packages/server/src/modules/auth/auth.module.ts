import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { database } from '@/modules';
import { WechatService } from '@/services';
import { jwt } from '@/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    database.DatabaseModule,
    CacheModule.register(),
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: '30day' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, WechatService],
  exports: [AuthService],
})
export class AuthModule {}
