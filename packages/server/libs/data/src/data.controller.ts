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
    SelectLedgerPageDto,
    SelectLedgerPageSchema,
} from './data.dto';
import { ZodValidationPipe } from '@bestlyg-server/common';

@Controller('/data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private readonly dataService: DataService) {}

    @Get('ledger/page')
    @UseGuards(AuthGuard)
    async getLedgerPage(
        @Query(new ZodValidationPipe(SelectLedgerPageSchema)) dto: SelectLedgerPageDto,
    ) {
        const data = await this.dataService.getLedgerPage(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Get('ledger/list')
    @UseGuards(AuthGuard)
    async getLedgerList() {
        const data = await this.dataService.getLedgerList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('ledger/summary')
    @UseGuards(AuthGuard)
    async getLedgerSummary() {
        const data = await this.dataService.getLedgerSummary();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('xuan')
    @UseGuards(AuthGuard)
    async getXuanList() {
        const data = await this.dataService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('secrets')
    @UseGuards(AuthGuard)
    async getSecrets() {
        const data = await this.dataService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode/problem/list')
    async getLeetcodeProblemList() {
        const data = await this.dataService.getLeetcodeProblemList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode/problem')
    async getLeetcodeProblems(@Query('name') name: string) {
        const data = await this.dataService.getLeetcodeProblem({ name });
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless')
    async getServerless() {
        const data = await this.dataService.getServerless();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless-code')
    async getServerlessCode(
        @Query(new ZodValidationPipe(SelectServerlessCodeSchema)) dto: SelectServerlessCodeDto,
    ) {
        const data = await this.dataService.getServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('serverless-code')
    async createServerlessCode(
        @Body(new ZodValidationPipe(CreateServerlessCodeSchema)) dto: CreateServerlessCodeDto,
    ) {
        const data = await this.dataService.createServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch('serverless-code')
    async updateServerlessCode(
        @Body(new ZodValidationPipe(UpdateServerlessCodeSchema)) dto: UpdateServerlessCodeDto,
    ) {
        const data = await this.dataService.updateServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('serverless-code')
    async deleteServerlessCode(
        @Body(new ZodValidationPipe(DeleteServerlessCodeSchema)) dto: DeleteServerlessCodeDto,
    ) {
        const data = await this.dataService.deleteServerlessCode(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Get('user/list')
    async getUserList() {
        const data = await this.dataService.getUserList();
        return ResponseEntity.ofSuccess(data);
    }
    
}
