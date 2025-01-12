import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { DataService } from './data.service';
import {
    CreateServerlessCodeDto,
    DeleteServerlessCodeDto,
    SelectServerlessCodeDto,
    UpdateServerlessCodeDto,
    SelectServerlessCodeSchema,
    CreateServerlessCodeSchema,
    DeleteServerlessCodeSchema,
    UpdateServerlessCodeSchema,
} from './data.dto';
import { ZodValidationPipe } from '@bestlyg-server/common';

@UseGuards(AuthGuard)
@Controller('/api/data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private readonly dataService: DataService) {}

    @Get('ledger')
    async getLedgers() {
        const data = await this.dataService.getLedgers();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('xuan')
    async getXuanList() {
        const data = await this.dataService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('secrets')
    async getSecrets() {
        const data = await this.dataService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode')
    async getLeetcodeProblems() {
        const data = await this.dataService.getLeetcodeProblems();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless')
    async getServerless() {
        const data = await this.dataService.getServerless();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless-code')
    @UsePipes(new ZodValidationPipe(SelectServerlessCodeSchema))
    async getServerlessCode(@Query() dto: SelectServerlessCodeDto) {
        const data = await this.dataService.getServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('serverless-code')
    @UsePipes(new ZodValidationPipe(CreateServerlessCodeSchema))
    async createServerlessCode(@Body() dto: CreateServerlessCodeDto) {
        const data = await this.dataService.createServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch('serverless-code')
    @UsePipes(new ZodValidationPipe(UpdateServerlessCodeSchema))
    async updateServerlessCode(@Body() dto: UpdateServerlessCodeDto) {
        const data = await this.dataService.updateServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('serverless-code')
    @UsePipes(new ZodValidationPipe(DeleteServerlessCodeSchema))
    async deleteServerlessCode(@Body() dto: DeleteServerlessCodeDto) {
        const data = await this.dataService.deleteServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }
}
