import { Controller, Get, Logger } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ClientService } from './client.service';

@Controller('/api/client')
export class ClientController {
    private readonly logger = new Logger(ClientController.name);
    constructor(private readonly clientService: ClientService) {}
}
