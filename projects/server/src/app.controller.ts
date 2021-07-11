import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQRCode, QRCodeService, ResponseQRCodeDto } from './services';
import { Response } from 'express';
import { BaseController, ResponseDto } from '@/base';
import { Code, Message } from './models';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Global')
@Controller('app')
export class AppController extends BaseController {
  constructor(
    private readonly appService: AppService,
    private readonly qrCodeService: QRCodeService
  ) {
    super();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiOkResponse({
    type: 'binary',
    description: '生成二维码',
  })
  @Get('qrcode')
  qrcode(@Query() query: CreateQRCode, @Res() response: Response): void {
    this.qrCodeService.create(query).then((data: Buffer | string) => {
      if (query.mode === 'image') {
        response.setHeader('Content-Type', 'image/png');
        response.write(data);
        response.end();
      } else {
        response.json({
          success: true,
          code: Code.SUCCESS,
          data,
          msg: Message[Code.SUCCESS],
        });
      }
    });
  }
}
