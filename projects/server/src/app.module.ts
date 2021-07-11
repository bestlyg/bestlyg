import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules';
import { QRCodeService } from './services';
import { resolve } from '@/utils';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('../client'),
      exclude: ['/api*', '/docs'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, QRCodeService],
})
export class AppModule {}
