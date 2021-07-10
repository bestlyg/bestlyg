import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as stream from 'stream';

export class CreateQRCode {
  data: string;
  mode: 'data' | 'string' | 'image';
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  scale?: number;
  width?: number;
  color?: {
    dark: string;
    light: string;
  };
}
export class CreateQRCodeDataURLMode extends CreateQRCode {
  type: 'image/webp' | 'image/png' | 'image/jpeg';
}
export class CreateQRCodeStringMode extends CreateQRCode {}
export class CreateQRCodeFileMode extends CreateQRCode {
  path: string;
}
@Injectable()
export class QRCodeService {
  create(options: CreateQRCode) {
    switch (options.mode) {
      case 'data':
        return this.toDataURLQRCode(options as CreateQRCodeDataURLMode);
      case 'string':
        return this.toStringQRCode(options as CreateQRCodeStringMode);
      case 'image':
        return this.toFileQRCode(options as CreateQRCodeFileMode);
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
  }: CreateQRCodeDataURLMode) {
    return QRCode.toDataURL(data, { errorCorrectionLevel, type, margin, scale, width, color });
  }
  private toStringQRCode({
    data,
    errorCorrectionLevel,
    margin,
    scale,
    width,
    color,
  }: CreateQRCodeStringMode) {
    return QRCode.toDataURL(data, { errorCorrectionLevel, margin, scale, width, color });
  }
  private toFileQRCode({
    data,
    errorCorrectionLevel,
    margin,
    scale,
    width,
    color,
  }: CreateQRCodeFileMode) {
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
