import { BaseController, ResponseDto } from '@/base';
import { Code, Message } from '@/models';
import { CreateQRCode, QRCodeService } from '@/services';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Global')
@Controller('global')
export class GlobalController extends BaseController {
  constructor(private readonly qrCodeService: QRCodeService) {
    super();
  }
  @ApiOkResponse({
    description: '生成二维码',
    schema: {
      oneOf: [
        {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: { type: 'string' },
              },
            },
          ],
        },
        {
          type: 'buffer',
        },
      ],
    },
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
