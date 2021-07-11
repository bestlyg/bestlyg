import { QRCodeService } from '@/services';
import { Module } from '@nestjs/common';
import { GlobalController } from './global.controller';

@Module({
  imports: [],
  controllers: [GlobalController],
  providers: [QRCodeService],
})
export class GlobalModule {}
