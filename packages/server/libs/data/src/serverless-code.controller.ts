import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Patch,
    Post,
    Query,
    UsePipes,
} from '@nestjs/common';
import {
    ResponseEntity,
    SelectServerlessCodeDto,
    CreateServerlessCodeDto,
    UpdateServerlessCodeDto,
    DeleteServerlessCodeDto,
} from '@bestlyg/common';
import { ServerlessCodeService } from './serverless-code.service';

@Controller('/data/serverless-code')
export class ServerlessCodeController {
    private readonly logger = new Logger(ServerlessCodeController.name);
    constructor(private readonly serverlessCodeService: ServerlessCodeService) {}

    @Get()
    async getServerlessCode(@Query() dto: SelectServerlessCodeDto) {
        const data = await this.serverlessCodeService.getServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async createServerlessCode(@Body() dto: CreateServerlessCodeDto) {
        const data = await this.serverlessCodeService.createServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch()
    async updateServerlessCode(@Body() dto: UpdateServerlessCodeDto) {
        const data = await this.serverlessCodeService.updateServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete()
    async deleteServerlessCode(@Body() dto: DeleteServerlessCodeDto) {
        const data = await this.serverlessCodeService.deleteServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }
}
