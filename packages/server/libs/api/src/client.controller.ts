import { Controller, Logger, RequestMapping } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import * as idl from '@bestlyg/common/idl/server';
import { ClientService } from './client.service';
import { getRequestMethod } from '@bestlyg-server/common';

@Controller()
export class ClientController {
    private readonly logger = new Logger(ClientController.name);
    constructor(private readonly clientService: ClientService) {}

    @RequestMapping({
        path: idl.api.bestlyg.ClientService.GetDocsSidebars.url,
        method: getRequestMethod(idl.api.bestlyg.ClientService.GetDocsSidebars.method),
    })
    async getDocsSidebars() {
        const data: idl.api.bestlyg.ClientService.GetDocsSidebars.Response =
            await this.clientService.getDocsSidebars();
        return ResponseEntity.ofSuccess(data);
    }

    @RequestMapping({
        path: idl.api.bestlyg.ClientService.GetLeetcodeSidebars.url,
        method: getRequestMethod(idl.api.bestlyg.ClientService.GetLeetcodeSidebars.method),
    })
    async getLeetcodeSidebars() {
        const data: idl.api.bestlyg.ClientService.GetLeetcodeSidebars.Response =
            await this.clientService.getLeetcodeSidebars();
        return ResponseEntity.ofSuccess(data);
    }
}
