import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/blog')
  async getHello() {
    return await this.appService.getHello();
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
