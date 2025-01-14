import { Controller, Get, Logger } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ApiService } from './api.service';

@Controller('/api')
export class ApiController {
    private readonly logger = new Logger(ApiController.name);
    constructor(private readonly apiService: ApiService) {}
    @Get('/health')
    async health() {
        return ResponseEntity.ofSuccess(this.apiService.getHealthCheck());
    }
}
