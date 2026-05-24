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
import { leetcode } from '@bestlyg-server/common';
import { Response } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
} from '@bestlyg/server-shared';
import {
    LeetcodeNameParamsRequestDto,
    LeetcodeProblemBatchCreateRequestDto,
    LeetcodeProblemBatchUpdateRequestDto,
    LeetcodeProblemBySlugResponseDto,
    LeetcodeProblemCreateRequestDto,
    LeetcodeProblemExportResponseDto,
    LeetcodeProblemPageRequestDto,
    LeetcodeProblemUpdateRequestDto,
    LeetcodeSlugParamsRequestDto,
    leetcodeProblemResourceSchema,
} from '@bestlyg/server-shared';
import { LeetcodeProblem } from '../../entities';
import { LeetcodeProblemService } from './leetcode-problem.service';
import { MAX_XLSX_SIZE, sendXlsxResponse, XLSX_MIME } from '@bestlyg/server-shared';

const config = leetcodeProblemResourceSchema;

@UseGuards(AuthGuard)
@Controller('/database/leetcode-problem')
export class LeetcodeProblemController {
    constructor(
        readonly service: LeetcodeProblemService,
        private readonly leetcodeService: leetcode.LeetCodeService,
    ) {}

    private getFindManyOptions(): FindManyOptions<LeetcodeProblem> {
        return {
            relations: { solutions: true },
        };
    }

    private getFindOneOptions(id: string): FindOneOptions<LeetcodeProblem> {
        return {
            relations: { solutions: true },
            where: { id },
        };
    }

    @Get()
    async findList() {
        const data = await this.service.find(this.getFindManyOptions());
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(@Query() query: LeetcodeProblemPageRequestDto) {
        const pageParam = new PageParam(query.current, query.pageSize);
        const data = await this.service.findPageAndCount(pageParam, this.getFindManyOptions());
        return ResponseEntity.ofSuccess(data);
    }

    @Get('export')
    async exportXlsx(@Res() res: Response) {
        const buffer = await this.service.exportXlsx(this.getFindManyOptions());
        const output = new LeetcodeProblemExportResponseDto({
            filename: `${config.resourceName}.xlsx`,
            contentType: XLSX_MIME,
            size: buffer.length,
        });
        sendXlsxResponse(res, output, buffer);
    }

    @Get('by-name/:name')
    async findByName(@Param() params: LeetcodeNameParamsRequestDto) {
        const data = await this.service.findOne({
            relations: { solutions: true },
            where: { name: params.name },
        });
        if (!data) throw new NotFoundException(`${config.resourceName} not found`);
        return ResponseEntity.ofSuccess(data);
    }

    @Get('by-slug/:slug')
    async findBySlug(@Param() params: LeetcodeSlugParamsRequestDto) {
        const data = await this.leetcodeService.getProblem(params.slug);
        return ResponseEntity.ofSuccess(new LeetcodeProblemBySlugResponseDto(data as any));
    }

    @Get(':id')
    async findOne(@Param() params: DatabaseIdParamsRequestDto) {
        const data = await this.service.findOne(this.getFindOneOptions(params.id));
        if (!data) throw new NotFoundException(`${config.resourceName} not found`);
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async save(@Body() body: LeetcodeProblemCreateRequestDto) {
        const data = await this.service.save(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(@Body() body: LeetcodeProblemBatchCreateRequestDto) {
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
    async updateBatch(@Body() body: LeetcodeProblemBatchUpdateRequestDto) {
        const data = await this.service.update(body.ids, body.data);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(
        @Param() params: DatabaseIdParamsRequestDto,
        @Body() body: LeetcodeProblemUpdateRequestDto,
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
