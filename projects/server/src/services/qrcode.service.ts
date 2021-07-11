import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import * as QRCode from 'qrcode';
import * as stream from 'stream';

export class CreateQRCodeColor {
  @ApiProperty({
    type: String,
    description: `深色模块颜色,十六进制RGBA`,
    default: '#000000ff',
    required: false,
  })
  dark?: string;
  @ApiProperty({
    type: String,
    description: `亮色模块颜色,十六进制RGBA`,
    default: '#ffffffff',
    required: false,
  })
  light?: string;
}
export class CreateQRCode {
  @ApiProperty({
    type: String,
    description: '二维码数据',
    required: true,
    example: '一段二维码内的数据',
  })
  data: string;
  @ApiProperty({
    enum: ['data', 'string', 'image '],
    description: `生成二维码模式,
    data:base64,
    string:字符串模式,
    image:图片模式`,
    required: true,
    example: 'data',
  })
  mode: 'data' | 'string' | 'image';
  @ApiProperty({
    enum: ['L', 'M', 'Q', 'H'],
    description: `二维码容错范围,
    L (Low)	~7%,
    M (Medium)	~15%,
    Q (Quartile)	~25%,
    H (High)	~30%`,
    required: false,
    default: 'M',
  })
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  @ApiProperty({
    type: Number,
    description: `边框宽度`,
    required: false,
    default: 4,
  })
  margin?: number;
  @ApiProperty({
    type: Number,
    description: `每个块占据的像素大小`,
    required: false,
    default: 4,
  })
  scale?: number;
  @ApiProperty({
    type: Number,
    description: `强制输出图像的特定宽度。如果宽度太小，无法包含QR符号，则将忽略此选项。`,
    required: false,
  })
  width?: number;
  @ApiProperty({
    type: CreateQRCodeColor,
    description: `二维码颜色`,
    required: false,
  })
  color?: CreateQRCodeColor;
  @ApiProperty({
    enum: ['image/webp', 'image/png', 'image/jpeg'],
    description: `base64生成时的图片格式`,
    required: false,
    default: 'image/png',
  })
  type?: 'image/webp' | 'image/png' | 'image/jpeg';
}
@Injectable()
export class QRCodeService {
  create(options: CreateQRCode) {
    switch (options.mode) {
      case 'data':
        return this.toDataURLQRCode(options);
      case 'string':
        return this.toStringQRCode(options);
      case 'image':
        return this.toFileQRCode(options);
    }
  }
  private toDataURLQRCode({
    data,
    type,
    errorCorrectionLevel,
    margin,
    scale,
    width,
    color,
  }: CreateQRCode) {
    return QRCode.toDataURL(data, { errorCorrectionLevel, type, margin, scale, width, color });
  }
  private toStringQRCode({
    data,
    errorCorrectionLevel,
    margin,
    scale,
    width,
    color,
  }: CreateQRCode) {
    return QRCode.toDataURL(data, { errorCorrectionLevel, margin, scale, width, color });
  }
  private toFileQRCode({ data, errorCorrectionLevel, margin, scale, width, color }: CreateQRCode) {
    return new Promise(resolve => {
      let buffer: Buffer = Buffer.from('');
      const ws = new Ws(data => (buffer = Buffer.concat([buffer, data])));
      QRCode.toFileStream(ws, data, {
        errorCorrectionLevel,
        margin,
        scale,
        width,
        color,
      });
      ws.on('finish', () => {
        resolve(buffer);
      });
    });
  }
}

class Ws extends stream.Writable {
  constructor(private onWirte: (data: Buffer) => void) {
    super();
  }
  _write(data, encoding, done) {
    this.onWirte(data);
    done(null);
  }
}
