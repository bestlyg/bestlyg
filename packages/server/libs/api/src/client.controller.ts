import { Controller, Get } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ClientService } from './client.service';
import { ApiResponse } from '@nestjs/swagger';
import { Sidebar } from './api.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get('docs/sidebars')
    @ApiResponse({ type: Sidebar })
    async getDocsSidebars() {
        const data = await this.clientService.getDocsSidebars();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode/sidebars')
    @ApiResponse({ type: Sidebar })
    async getLeetcodeSidebars() {
        const data = await this.clientService.getLeetcodeSidebars();
        return ResponseEntity.ofSuccess(data);
    }
}
