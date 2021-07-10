import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQRCode, QRCodeService } from './services';
import { Response } from 'express';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly qrCodeService: QRCodeService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('qrcode')
  qrcode(@Query() query: CreateQRCode, @Res() response: Response): any {
    return this.qrCodeService
      .create(query)
      .then(res => {
        if (query.mode === 'image') {
          response.write(res);
          return;
        }
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
