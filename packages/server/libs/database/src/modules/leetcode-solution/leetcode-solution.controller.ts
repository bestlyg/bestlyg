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
    type LeetcodeSolutionBatchCreateRequestDto,
    LeetcodeSolutionBatchCreateRequestSchema,
    type LeetcodeSolutionBatchUpdateRequestDto,
    LeetcodeSolutionBatchUpdateRequestSchema,
    type LeetcodeSolutionCreateRequestDto,
    LeetcodeSolutionCreateRequestSchema,
    LeetcodeSolutionExportResponseSchema,
    type LeetcodeSolutionPageRequestDto,
    LeetcodeSolutionPageRequestSchema,
    type LeetcodeSolutionUpdateRequestDto,
    LeetcodeSolutionUpdateRequestSchema,
    leetcodeSolutionResourceSchema,
} from '@bestlyg/server-shared';
import { LeetcodeSolutionService } from './leetcode-solution.service';
import { MAX_XLSX_SIZE, sendXlsxResponse, XLSX_MIME } from '@bestlyg/server-shared';

const config = leetcodeSolutionResourceSchema;

@UseGuards(AuthGuard)
@Controller('/database/leetcode-solution')
export class LeetcodeSolutionController {
    constructor(readonly service: LeetcodeSolutionService) {}

    @Get()
    async findList() {
        const data = await this.service.find({});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(
        @Query({ schema: LeetcodeSolutionPageRequestSchema }) query: LeetcodeSolutionPageRequestDto,
    ) {
        const pageParam = new PageParam(query.current, query.pageSize);
        const data = await this.service.findPageAndCount(pageParam, {});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('export')
    async exportXlsx(@Res() res: Response) {
        const buffer = await this.service.exportXlsx({});
        const output = LeetcodeSolutionExportResponseSchema.parse({
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
    async save(
        @Body({ schema: LeetcodeSolutionCreateRequestSchema })
        body: LeetcodeSolutionCreateRequestDto,
    ) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(
        @Body({ schema: LeetcodeSolutionBatchCreateRequestSchema })
        body: LeetcodeSolutionBatchCreateRequestDto,
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
        @Body({ schema: LeetcodeSolutionBatchUpdateRequestSchema })
        body: LeetcodeSolutionBatchUpdateRequestDto,
    ) {
        const data = await this.service.update(body.ids, body.data);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(
        @Param({ schema: DatabaseIdParamsRequestSchema }) params: DatabaseIdParamsRequestDto,
        @Body({ schema: LeetcodeSolutionUpdateRequestSchema })
        body: LeetcodeSolutionUpdateRequestDto,
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
