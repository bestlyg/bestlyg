import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PageParam, ResponseEntity } from '@bestlyg/server-shared';
import { AuthGuard } from '@bestlyg-server/auth/auth.guard';
import dayjs from 'dayjs';
import { Response } from 'express';
import { Between, FindManyOptions } from 'typeorm';
import {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
} from '@bestlyg/server-shared';
import {
    LedgerBatchCreateRequestDto,
    LedgerBatchUpdateRequestDto,
    LedgerCreateRequestDto,
    LedgerExportRequestDto,
    LedgerExportResponseDto,
    LedgerPageRequestDto,
    LedgerQueryRequestDto,
    LedgerUpdateRequestDto,
    ledgerResourceSchema,
} from '@bestlyg/server-shared';
import { Ledger } from '../../entities';
import { LedgerService } from './ledger.service';
import { MAX_XLSX_SIZE, sendXlsxResponse, XLSX_MIME } from '@bestlyg/server-shared';

const config = ledgerResourceSchema;

@UseGuards(AuthGuard)
@Controller('/database/ledger')
export class LedgerController {
    constructor(readonly service: LedgerService) {}

    private getFindManyOptions(query: { date?: string }): FindManyOptions<Ledger> {
        if (!query.date) return {};

        return {
            where: {
                date: Between(
                    dayjs(query.date).startOf('day').toDate(),
                    dayjs(query.date).endOf('day').toDate(),
                ),
            },
        };
    }

    @Get()
    async findList(@Query() query: LedgerQueryRequestDto) {
        const data = await this.service.find(this.getFindManyOptions(query));
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(@Query() query: LedgerPageRequestDto) {
        const pageParam = new PageParam(query.current, query.pageSize);
        const data = await this.service.findPageAndCount(pageParam, this.getFindManyOptions(query));
        return ResponseEntity.ofSuccess(data);
    }

    @Get('export')
    async exportXlsx(@Query() query: LedgerExportRequestDto, @Res() res: Response) {
        const buffer = await this.service.exportXlsx(this.getFindManyOptions(query));
        const output = new LedgerExportResponseDto({
            filename: `${config.resourceName}.xlsx`,
            contentType: XLSX_MIME,
            size: buffer.length,
        });
        sendXlsxResponse(res, output, buffer);
    }

    @Get(':id')
    async findOne(@Param() params: DatabaseIdParamsRequestDto) {
        const data = await this.service.findOne({ where: { id: params.id } });
        if (!data) throw new NotFoundException(`${config.resourceName} not found`);
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async save(@Body() body: LedgerCreateRequestDto) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(@Body() body: LedgerBatchCreateRequestDto) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('import/update')
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_XLSX_SIZE } }))
    async importUpdateXlsx(@UploadedFile() file: DatabaseXlsxFileRequestDto) {
        const data = await this.service.importUpdateXlsx(file);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('import')
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_XLSX_SIZE } }))
    async importXlsx(@UploadedFile() file: DatabaseXlsxFileRequestDto) {
        const data = await this.service.importXlsx(file);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch('batch')
    async updateBatch(@Body() body: LedgerBatchUpdateRequestDto) {
        const data = await this.service.update(body.ids, body.data);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(
        @Param() params: DatabaseIdParamsRequestDto,
        @Body() body: LedgerUpdateRequestDto,
    ) {
        const data = await this.service.update(params.id, body);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('batch')
    async deleteBatch(@Body() body: DatabaseBatchDeleteRequestDto) {
        const data = await this.service.delete(body.ids);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete(':id')
    async delete(@Param() params: DatabaseIdParamsRequestDto) {
        const data = await this.service.delete(params.id);
        return ResponseEntity.ofSuccess(data);
    }
}
