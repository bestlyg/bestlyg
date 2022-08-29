import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './base';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  @Redirect('/blog')
  async getHello() {
    return this.result(this.appService.getHello());
  }
  // @Get('/cats')
  // async getCats() {
  //   return await this.catsService.findAll();
  // }
  // @Post('/cats')
  // async createCats(dto: CreateCatDto) {
  //   return await this.catsService.create(dto);
  // }
}
