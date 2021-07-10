import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules';
import { QRCodeService } from './services';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, QRCodeService],
})
export class AppModule {}
