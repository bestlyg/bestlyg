import { Controller, Get, Logger, RequestMapping } from '@nestjs/common';
import { ResponseEntity, SidebarDto } from '@bestlyg/common';
import { ClientService } from './client.service';
import { getRequestMethod } from '@bestlyg-server/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
    private readonly logger = new Logger(ClientController.name);
    constructor(private readonly clientService: ClientService) {}

    @Get('docs/sidebars')
    @ApiResponse({ type: SidebarDto })
    async getDocsSidebars() {
        const data = await this.clientService.getDocsSidebars();
        return ResponseEntity.ofSuccess(data.getPlain());
    }

    @Get('leetcode/sidebars')
    @ApiResponse({ type: SidebarDto })
    async getLeetcodeSidebars() {
        const data = await this.clientService.getLeetcodeSidebars();
        return ResponseEntity.ofSuccess(data.getPlain());
    }
}
