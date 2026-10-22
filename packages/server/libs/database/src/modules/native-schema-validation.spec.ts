import { afterAll, beforeAll, beforeEach, describe, expect, it, rs } from '@rstest/core';
import { StandardSchemaValidationPipe, type INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PageParam } from '@bestlyg/server-shared';
import request from 'supertest';
import { AuthGuard } from '../../../auth/src/auth.guard';
import { AllExceptionsFilter } from '../../../../src/filters/all-exceptions.filter';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

const id = '11111111-1111-4111-8111-111111111111';
const user = { name: 'smoke', pwd: 'pw', avatar: 'a', description: 'd', nickname: 'n' };

describe('Nest native schema validation over HTTP', () => {
    let app: INestApplication;
    const service = {
        save: rs.fn().mockResolvedValue({ id }),
        update: rs.fn().mockResolvedValue({ affected: 1 }),
        findOne: rs.fn().mockResolvedValue({ id }),
        findPageAndCount: rs.fn().mockResolvedValue({ list: [], total: 0 }),
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{ provide: UserService, useValue: service }],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();
        app = module.createNestApplication({ logger: false });
        app.useGlobalPipes(new StandardSchemaValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
        await app.init();
    });

    beforeEach(() => {
        rs.clearAllMocks();
    });
    afterAll(async () => {
        await app?.close();
    });

    it('passes coerced and trimmed schema data to the service', async () => {
        const response = await request(app.getHttpServer())
            .post('/database/user')
            .send({ ...user, name: ' smoke ', nickname: 42 });
        expect(response.body.code).toBe(0);
        expect(service.save).toHaveBeenCalledWith({ ...user, nickname: '42' });
        expect(Object.getPrototypeOf(service.save.mock.calls[0][0])).toBe(Object.prototype);
    });

    it('rejects missing or invalid fields with useful field errors', async () => {
        const response = await request(app.getHttpServer())
            .post('/database/user')
            .send({ name: '' });
        expect(response.body.code).toBe(400);
        expect(response.body.msg).toContain('name');
        expect(service.save).not.toHaveBeenCalled();
    });

    it('preserves strict schemas when unknown fields are sent', async () => {
        const response = await request(app.getHttpServer())
            .post('/database/user')
            .send({ ...user, unexpected: true });
        expect(response.body.code).toBe(400);
        expect(service.save).not.toHaveBeenCalled();
    });

    it.each([
        ['', 1, 10],
        ['?current=2&pageSize=3', 2, 3],
    ] as const)('applies query coercion and defaults (%s)', async (query, current, pageSize) => {
        const response = await request(app.getHttpServer()).get('/database/user/page' + query);
        expect(response.body.code).toBe(0);
        expect(service.findPageAndCount).toHaveBeenCalledWith(new PageParam(current, pageSize), {});
    });

    it('rejects invalid route IDs before querying the database', async () => {
        const response = await request(app.getHttpServer()).get('/database/user/not-a-uuid');
        expect(response.body.code).toBe(400);
        expect(response.body.msg).toContain('id');
        expect(service.findOne).not.toHaveBeenCalled();
    });

    it('retains nonempty update refinements', async () => {
        const response = await request(app.getHttpServer())
            .patch('/database/user/' + id)
            .send({});
        expect(response.body.code).toBe(400);
        expect(service.update).not.toHaveBeenCalled();
    });

    it('rejects empty batch arrays', async () => {
        const response = await request(app.getHttpServer()).post('/database/user/batch').send([]);
        expect(response.body.code).toBe(400);
        expect(service.save).not.toHaveBeenCalled();
    });

    it('validates every batch item and includes the item index in errors', async () => {
        const response = await request(app.getHttpServer())
            .post('/database/user/batch')
            .send([user, { ...user, name: '' }]);
        expect(response.body.code).toBe(400);
        expect(response.body.msg).toContain('1.name');
        expect(service.save).not.toHaveBeenCalled();
    });

    it('passes validated batch arrays through without constructing model instances', async () => {
        const response = await request(app.getHttpServer())
            .post('/database/user/batch')
            .send([user]);
        expect(response.body.code).toBe(0);
        expect(service.save).toHaveBeenCalledWith([user]);
    });
});
