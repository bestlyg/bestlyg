import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Redirect('/web/site')
    redirect() {}
}
