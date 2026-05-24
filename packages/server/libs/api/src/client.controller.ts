import { Controller, Get } from '@nestjs/common';
import {
    ClientGetDocsSidebarsResponseDto,
    ClientGetLeetcodeSidebarsResponseDto,
    ResponseEntity,
} from '@bestlyg/server-shared';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get('docs/sidebars')
    async getDocsSidebars() {
        const data: ClientGetDocsSidebarsResponseDto = await this.clientService.getDocsSidebars();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode/sidebars')
    async getLeetcodeSidebars() {
        const data: ClientGetLeetcodeSidebarsResponseDto =
            await this.clientService.getLeetcodeSidebars();
        return ResponseEntity.ofSuccess(data);
    }
}
