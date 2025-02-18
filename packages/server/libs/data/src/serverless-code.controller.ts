import { Body, Controller, Delete, Get, Logger, Patch, Post, Query } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessCodeService } from './serverless-code.service';
import { ZodValidationPipe } from '@bestlyg-server/common';
import {
    SelectServerlessCodeSchema,
    SelectServerlessCodeDto,
    CreateServerlessCodeSchema,
    CreateServerlessCodeDto,
    UpdateServerlessCodeSchema,
    UpdateServerlessCodeDto,
    DeleteServerlessCodeSchema,
    DeleteServerlessCodeDto,
} from './serverless-code.dto';

@Controller('/data/serverless-code')
export class ServerlessCodeController {
    private readonly logger = new Logger(ServerlessCodeController.name);
    constructor(private readonly serverlessCodeService: ServerlessCodeService) {}

    @Get()
    async getServerlessCode(
        @Query(new ZodValidationPipe(SelectServerlessCodeSchema)) dto: SelectServerlessCodeDto,
    ) {
        const data = await this.serverlessCodeService.getServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async createServerlessCode(
        @Body(new ZodValidationPipe(CreateServerlessCodeSchema)) dto: CreateServerlessCodeDto,
    ) {
        const data = await this.serverlessCodeService.createServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch()
    async updateServerlessCode(
        @Body(new ZodValidationPipe(UpdateServerlessCodeSchema)) dto: UpdateServerlessCodeDto,
    ) {
        const data = await this.serverlessCodeService.updateServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete()
    async deleteServerlessCode(
        @Body(new ZodValidationPipe(DeleteServerlessCodeSchema)) dto: DeleteServerlessCodeDto,
    ) {
        const data = await this.serverlessCodeService.deleteServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }
}
