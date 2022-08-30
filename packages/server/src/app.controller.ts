import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { BaseController } from './base';

@Controller()
export class AppController extends BaseController {
  constructor() {
    super();
  }
  @Get()
  @Redirect('/blog')
  async index() {
    return this.result();
  }
}
