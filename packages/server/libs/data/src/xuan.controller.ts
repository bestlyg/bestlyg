import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { XuanService } from './xuan.service';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';

@Controller('/data/xuan')
@UseGuards(AuthGuard)
export class XuanController {
    private readonly logger = new Logger(XuanController.name);
    constructor(private readonly xuanService: XuanService) {}

    @Get()
    async getXuanList() {
        const data = await this.xuanService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }
}
