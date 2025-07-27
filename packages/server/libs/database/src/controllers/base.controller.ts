import { Body, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { EntityService } from '@bestlyg-server/database';
import { ObjectLiteral } from 'typeorm';
import { PageParam, ResponseEntity, SelectLedgerPageDto } from '@bestlyg/common';

export interface BaseOptions {
    params: any;
    query: any;
    body: any;
    headers: any;
}

export abstract class BaseController<Entity extends ObjectLiteral> {
    constructor(protected readonly service: EntityService<Entity>) {}

    protected async _select(opts: BaseOptions) {
        const id = opts.params.id;
        const data = await this.service.findOne({ where: { id: id } });
        return data;
    }

    protected async _findList(_: BaseOptions) {
        const data = await this.service.find();
        return data;
    }

    protected async _findPageAndCount(opts: BaseOptions) {
        const dto = new SelectLedgerPageDto(opts.query);
        const data = await this.service.findPageAndCount(PageParam.from(dto), {});
        return data;
    }

    protected async _create(opts: BaseOptions) {
        const data = await this.service.create(opts.body);
        return data;
    }

    protected async _update(opts: BaseOptions) {
        const data = opts.body;
        const id = opts.query.id;
        const res = await this.service.update(id, data);
        return res;
    }

    protected async _delete(opts: BaseOptions) {
        const id = opts.body.id;
        const res = await this.service.delete(id);
        return res;
    }

    @Get('select/:id')
    async findOne(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._select({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
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

    @Post()
    async create(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._create({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Patch(':id')
    async update(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._update({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Delete()
    async delete(@Param() params, @Query() query, @Body() body, @Headers() headers) {
        const data = await this._delete({ params, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }
}
