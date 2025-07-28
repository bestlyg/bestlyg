import { Body, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { EntityService } from '@bestlyg-server/database';
import { PageParam, ResponseEntity, SelectLedgerPageDto } from '@bestlyg/common';
import { BaseEntity } from '../entities/base.entity';

export interface BaseOptions {
    params: any;
    query: any;
    body: any;
    headers: any;
}

export abstract class BaseController<Entity extends BaseEntity> {
    constructor(protected readonly service: EntityService<Entity>) {}

    protected async _select(
        opts: BaseOptions,
        options: Parameters<typeof this.service.findOne>[0] = { where: { id: opts.params.id } },
    ) {
        const data = await this.service.findOne(options);
        return data;
    }

    protected async _findList(
        _: BaseOptions,
        options: Parameters<typeof this.service.find>[0] = {},
    ) {
        const data = await this.service.find(options);
        return data;
    }

    protected async _findPageAndCount(
        opts: BaseOptions,
        options: Parameters<typeof this.service.findPageAndCount>[1] = {},
    ) {
        const dto = new SelectLedgerPageDto(opts.query);
        const data = await this.service.findPageAndCount(PageParam.from(dto), options);
        return data;
    }

    protected async _create(opts: BaseOptions) {
        const data = await this.service.create(opts.body);
        return data;
    }

    protected async _save(
        opts: BaseOptions,
        options: Parameters<typeof this.service.save>[1] = {},
    ) {
        const data = await this.service.save(opts.body, options);
        return data;
    }

    protected async _update(opts: BaseOptions) {
        const data = opts.body;
        const id = opts.query.id;
        const res = await this.service.update(id, data);
        return res;
    }

    protected async _delete(opts: BaseOptions) {
        const id = opts.params.id;
        const res = await this.service.delete(id);
        return res;
    }

    protected async _deleteBatch(opts: BaseOptions) {
        console.log('_deleteBatch', opts);
        const ids = opts.body;
        const res = await this.service.delete(ids);
        return res;
    }

    @Get('list')
    async findList(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._findList({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Get('page')
    async findPageAndCount(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._findPageAndCount({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Get(':id')
    async findOne(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._select({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Post()
    async save(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._save({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Post('batch')
    async saveBatch(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._save({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._update({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('batch')
    async deleteBatch(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._deleteBatch({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Delete(':id')
    async delete(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._delete({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }
}
