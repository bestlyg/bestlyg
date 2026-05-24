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
import { Response } from 'express';
import {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
} from '@bestlyg/server-shared';
import {
    CasbinRuleBatchCreateRequestDto,
    CasbinRuleBatchUpdateRequestDto,
    CasbinRuleCreateRequestDto,
    CasbinRuleExportResponseDto,
    CasbinRulePageRequestDto,
    CasbinRuleUpdateRequestDto,
    casbinRuleResourceSchema,
} from '@bestlyg/server-shared';
import { CasbinRuleService } from './casbin-rule.service';
import { MAX_XLSX_SIZE, sendXlsxResponse, XLSX_MIME } from '@bestlyg/server-shared';

const config = casbinRuleResourceSchema;

@UseGuards(AuthGuard)
@Controller('/database/casbin-rule')
export class CasbinRuleController {
    constructor(readonly service: CasbinRuleService) {}

    @Get()
    async findList() {
        const data = await this.service.find({});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(@Query() query: CasbinRulePageRequestDto) {
        const pageParam = new PageParam(query.current, query.pageSize);
        const data = await this.service.findPageAndCount(pageParam, {});
        return ResponseEntity.ofSuccess(data);
    }

    @Get('export')
    async exportXlsx(@Res() res: Response) {
        const buffer = await this.service.exportXlsx({});
        const output = new CasbinRuleExportResponseDto({
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
    async save(@Body() body: CasbinRuleCreateRequestDto) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(@Body() body: CasbinRuleBatchCreateRequestDto) {
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
    async updateBatch(@Body() body: CasbinRuleBatchUpdateRequestDto) {
        const data = await this.service.update(body.ids, body.data);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(
        @Param() params: DatabaseIdParamsRequestDto,
        @Body() body: CasbinRuleUpdateRequestDto,
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
