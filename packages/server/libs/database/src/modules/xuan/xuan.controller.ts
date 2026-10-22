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
import type { Response } from 'express';
import {
    type DatabaseBatchDeleteRequestDto,
    DatabaseBatchDeleteRequestSchema,
    type DatabaseIdParamsRequestDto,
    DatabaseIdParamsRequestSchema,
    type DatabaseXlsxFileRequestDto,
} from '@bestlyg/server-shared';
import {
    type XuanBatchCreateRequestDto,
    XuanBatchCreateRequestSchema,
    type XuanBatchUpdateRequestDto,
    XuanBatchUpdateRequestSchema,
    type XuanCreateRequestDto,
    XuanCreateRequestSchema,
    XuanExportResponseSchema,
    type XuanPageRequestDto,
    XuanPageRequestSchema,
    type XuanUpdateRequestDto,
    XuanUpdateRequestSchema,
    xuanResourceSchema,
} from '@bestlyg/server-shared';
import { XuanService } from './xuan.service';
import { MAX_XLSX_SIZE, sendXlsxResponse, XLSX_MIME } from '@bestlyg/server-shared';

const config = xuanResourceSchema;

@UseGuards(AuthGuard)
@Controller('/database/xuan')
export class XuanController {
    constructor(readonly service: XuanService) {}

    @Get()
    async findList() {
        const data = await this.service.find({});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(@Query({ schema: XuanPageRequestSchema }) query: XuanPageRequestDto) {
        const pageParam = new PageParam(query.current, query.pageSize);
        const data = await this.service.findPageAndCount(pageParam, {});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('export')
    async exportXlsx(@Res() res: Response) {
        const buffer = await this.service.exportXlsx({});
        const output = XuanExportResponseSchema.parse({
            filename: `${config.resourceName}.xlsx`,
            contentType: XLSX_MIME,
            size: buffer.length,
        });
        sendXlsxResponse(res, output, buffer);
    }

    @Get(':id')
    async findOne(
        @Param({ schema: DatabaseIdParamsRequestSchema }) params: DatabaseIdParamsRequestDto,
    ) {
        const data = await this.service.findOne({ where: { id: params.id } });
        if (!data) throw new NotFoundException(`${config.resourceName} not found`);
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async save(@Body({ schema: XuanCreateRequestSchema }) body: XuanCreateRequestDto) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(
        @Body({ schema: XuanBatchCreateRequestSchema }) body: XuanBatchCreateRequestDto,
    ) {
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
    async updateBatch(
        @Body({ schema: XuanBatchUpdateRequestSchema }) body: XuanBatchUpdateRequestDto,
    ) {
        const data = await this.service.update(body.ids, body.data);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(
        @Param({ schema: DatabaseIdParamsRequestSchema }) params: DatabaseIdParamsRequestDto,
        @Body({ schema: XuanUpdateRequestSchema }) body: XuanUpdateRequestDto,
    ) {
        const data = await this.service.update(params.id, body);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('batch')
    async deleteBatch(
        @Body({ schema: DatabaseBatchDeleteRequestSchema }) body: DatabaseBatchDeleteRequestDto,
    ) {
        const data = await this.service.delete(body.ids);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete(':id')
    async delete(
        @Param({ schema: DatabaseIdParamsRequestSchema }) params: DatabaseIdParamsRequestDto,
    ) {
        const data = await this.service.delete(params.id);
        return ResponseEntity.ofSuccess(data);
    }
}
