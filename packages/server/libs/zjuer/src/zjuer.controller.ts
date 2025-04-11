import { Controller, Get, Redirect } from '@nestjs/common';
import { ZjuerService } from './zjuer.service';

@Controller('/zjuer')
export class ZjuerController {
    constructor(private readonly zjuerService: ZjuerService) {}

    @Get('/wiki')
    @Redirect('https://cskfogs2c7.feishu.cn/wiki/PV0jwZ2CiiFp8pkRHMscXm4UnUb')
    async toWiki() {}
}
