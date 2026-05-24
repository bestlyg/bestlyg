import { Controller, Get } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/server-shared';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get('docs/sidebars')
    async getDocsSidebars() {
        const data = await this.clientService.getDocsSidebars();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode/sidebars')
    async getLeetcodeSidebars() {
        const data = await this.clientService.getLeetcodeSidebars();
        return ResponseEntity.ofSuccess(data);
    }
}
