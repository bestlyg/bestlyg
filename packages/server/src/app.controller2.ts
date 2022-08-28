import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/ctr2')
export class AppController2 {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'ctr2';
  }
}
