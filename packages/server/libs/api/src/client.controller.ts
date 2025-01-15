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
        path: idl.api.bestlyg.ClientService.GetSidebars.url,
        method: getRequestMethod(idl.api.bestlyg.ClientService.GetSidebars.method),
    })
    async getSidebars() {
        const data: idl.api.bestlyg.ClientService.GetSidebars.Response =
            await this.clientService.getSidebars();
        return ResponseEntity.ofSuccess(data);
    }
}
