import { inspect } from 'node:util';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
    createZodModel,
    isZodModel,
    zodSchemaSymbol,
    ZodModelJsonParseError,
    ZodModelValidationError,
} from '../src/zod';

const userSchema = z
    .object({
        id: z.coerce.number().int(),
        name: z.string().default('anonymous'),
        optional: z.string().optional(),
        nullable: z.string().nullable().optional(),
    })
    .strip();

class UserModel extends createZodModel(userSchema) {}

describe('ZodModel', () => {
    it('validates raw input and exposes parsed fields', () => {
        const user = new UserModel({ id: '1' });

        expect(user).toBeInstanceOf(UserModel);
        expect(user.id).toBe(1);
        expect(user.name).toBe('anonymous');
        expect(user.modelDump()).toEqual({ id: 1, name: 'anonymous' });
        expect(user.getRaw()).toEqual({ id: '1' });
    });

    it('returns structured validation errors from safeParse', () => {
        const result = UserModel.safeParse({ id: 'not-a-number' });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error).toBeInstanceOf(ZodModelValidationError);
            expect(result.error.modelName).toBe('UserModel');
            expect(result.error.issues.length).toBeGreaterThan(0);
        }
    });

    it('copies models through validation and serializes business data only', () => {
        const user = new UserModel({ id: '1', name: 'Ada' });
        const copy = user.modelCopy({ update: { id: 2 } });

        expect(copy).toBeInstanceOf(UserModel);
        expect(copy.modelDump()).toEqual({ id: 2, name: 'Ada' });
        expect(JSON.parse(JSON.stringify(user))).toEqual({ id: 1, name: 'Ada' });
    });

    it('keeps internal state out of enumeration and JSON', () => {
        const user = new UserModel({ id: '1' });

        expect(Object.keys(user)).toEqual(['id', 'name']);
        expect(Object.getOwnPropertySymbols(user)).toEqual([]);
        expect({ ...user }).toEqual({ id: 1, name: 'anonymous' });
        expect(JSON.stringify(user)).toBe('{"id":1,"name":"anonymous"}');
    });

    it('marks model constructors with a global symbol', () => {
        expect(isZodModel(UserModel)).toBe(true);
        expect(UserModel[zodSchemaSymbol]).toBe(userSchema);
        expect(zodSchemaSymbol).toBe(Symbol.for('@bestlyg/core-shared/zod-schema'));
    });

    it('uses the debug string for Node inspect', () => {
        const user = new UserModel({ id: '1', name: 'Ada' });

        expect(user.toString()).toBe('UserModel { id: 1, name: "Ada" }');
        expect(inspect(user)).toBe('UserModel { id: 1, name: "Ada" }');
    });

    it('supports Pydantic-style aliases', () => {
        const user = UserModel.model_validate({ id: '1', name: 'Ada' });
        const copy = user.model_copy({ update: { id: 2 } });

        expect(user.model_dump()).toEqual({ id: 1, name: 'Ada' });
        expect(copy.model_dump()).toEqual({ id: 2, name: 'Ada' });
        expect(user.model_dump_json()).toBe('{"id":1,"name":"Ada"}');
    });

    it('validates JSON strings and separates JSON parse errors', () => {
        expect(UserModel.modelValidateJson('{"id":"1","name":"Ada"}').modelDump()).toEqual({
            id: 1,
            name: 'Ada',
        });
        expect(UserModel.model_validate_json('{"id":"2"}').modelDump()).toEqual({
            id: 2,
            name: 'anonymous',
        });

        const invalidJson = UserModel.safeParseJson('{');
        expect(invalidJson.success).toBe(false);
        if (!invalidJson.success) {
            expect(invalidJson.error).toBeInstanceOf(ZodModelJsonParseError);
            expect(invalidJson.error.modelName).toBe('UserModel');
        }

        const invalidModel = UserModel.safeParseJson('{"id":"nope"}');
        expect(invalidModel.success).toBe(false);
        if (!invalidModel.success) {
            expect(invalidModel.error).toBeInstanceOf(ZodModelValidationError);
        }
    });

    it('filters model dumps and JSON dumps', () => {
        const user = new UserModel({
            id: '1',
            name: 'Ada',
            optional: undefined,
            nullable: null,
        });

        expect(user.modelDump({ include: ['id', 'name'] })).toEqual({ id: 1, name: 'Ada' });
        expect(user.modelDump({ exclude: ['name'] })).toEqual({
            id: 1,
            optional: undefined,
            nullable: null,
        });
        expect(user.modelDump({ excludeUndefined: true })).toEqual({
            id: 1,
            name: 'Ada',
            nullable: null,
        });
        expect(user.modelDump({ excludeNull: true })).toEqual({
            id: 1,
            name: 'Ada',
            optional: undefined,
        });
        expect(user.model_dump_json({ include: ['id'], space: 2 })).toBe('{\n  "id": 1\n}');
    });

    it('tracks fields provided by raw input and can exclude unset defaults', () => {
        const defaulted = new UserModel({ id: '1' });
        const explicit = new UserModel({ id: '2', name: 'Ada', optional: undefined });

        expect(defaulted.modelDump({ excludeUnset: true })).toEqual({ id: 1 });
        expect(explicit.modelDump({ excludeUnset: true })).toEqual({
            id: 2,
            name: 'Ada',
            optional: undefined,
        });
        expect([...explicit.modelFieldsSet].sort()).toEqual(['id', 'name', 'optional']);

        const fieldsSetCopy = explicit.model_fields_set;
        fieldsSetCopy.add('nullable');
        expect([...explicit.modelFieldsSet].sort()).toEqual(['id', 'name', 'optional']);
    });

    it('exposes object schema fields and returns an empty field map for root schemas', () => {
        const rootModel = createZodModel(z.array(z.number()));

        expect(Object.keys(UserModel.modelFields)).toEqual(['id', 'name', 'optional', 'nullable']);
        expect(UserModel.model_fields.id).toBe(userSchema.shape.id);
        expect(rootModel.modelFields).toEqual({});
    });

    it('keeps array and root schema behavior unchanged', () => {
        const ArrayModel = createZodModel(z.array(z.number()));
        const value = new ArrayModel([1, 2]);

        expect(Array.isArray(value)).toBe(true);
        expect(value).toEqual([1, 2]);
        expect((value as any).modelDump).toBeUndefined();
    });

    it('runs post-init before opt-in freezing', () => {
        const calls: number[] = [];

        class FrozenModel extends createZodModel(
            z.object({
                id: z.number(),
            }),
            { frozen: true },
        ) {
            modelPostInit() {
                calls.push(this.id);
                (this as any).ready = true;
            }
        }

        const frozen = new FrozenModel({ id: 1 });

        expect(calls).toEqual([1]);
        expect((frozen as any).ready).toBe(true);
        expect(Object.isFrozen(frozen)).toBe(true);
        expect(() => {
            (frozen as any).id = 2;
        }).toThrow(TypeError);
    });

    it('allows overriding the snake_case post-init hook', () => {
        const calls: number[] = [];

        class SnakePostInitModel extends createZodModel(
            z.object({
                id: z.number(),
            }),
        ) {
            model_post_init() {
                calls.push(this.id);
            }
        }

        new SnakePostInitModel({ id: 1 });

        expect(calls).toEqual([1]);
    });
});
