import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { XuanService } from '../services';

@Controller('/database/xuan')
// @UseGuards(AuthGuard)
export class XuanController {
    constructor(private readonly xuanService: XuanService) {}

    @Get()
    async getXuanList() {
        const data = await this.xuanService.find();
        return ResponseEntity.ofSuccess(data);
    }
}
