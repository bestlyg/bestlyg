import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @Get()
    // @Redirect('/web/site')
    // redirect() {}

    // @Get('/favicon.ico')
    // @Redirect('/static/logo.ico')
    // redirectFavicon() {}
}
