import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import dayjs from 'dayjs';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/api')
export class ApiController {
    logger = new Logger(ApiController.name);

    @Get('/health')
    async health() {
        return ResponseEntity.ofSuccess(`health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`);
    }
}
