import { describe, test, expect } from '@rstest/core';
import { ANY_OP, DEFAULT_OP } from '@/shared';
import { BestPromise } from './promise';

const fulfilled = (value: number, ms = 10) =>
    new BestPromise<number>((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
const rejected = (reason: number, ms = 10) =>
    new BestPromise<number>((_, reject) => {
        setTimeout(() => reject(reason), ms);
    });

describe('Promise', () => {
    test('Promise.resolve', async () => {
        expect(await BestPromise.resolve(1)).toBe(1);
    });
    test('Promise.reject', async () => {
        await expect(Promise.resolve(BestPromise.reject(1))).rejects.toBe(1);
    });
    describe('Promise.race', () => {
        test('resolve', async () => {
            expect(await BestPromise.race([fulfilled(1), fulfilled(2, 20), fulfilled(3, 30)])).toBe(
                1,
            );
        });
        test('reject', async () => {
            await expect(
                Promise.resolve(
                    BestPromise.race([rejected(1), fulfilled(2, 20), fulfilled(3, 30)]),
                ),
            ).rejects.toBe(1);
        });
    });
    describe('Promise.any', () => {
        test('resolve', async () => {
            expect(await BestPromise.any([rejected(1), fulfilled(2, 20), fulfilled(3, 30)])).toBe(
                2,
            );
        });
        test('reject', async () => {
            await expect(
                Promise.resolve(BestPromise.any([rejected(1, 30), rejected(2, 20), rejected(3)])),
            ).rejects.toEqual([1, 2, 3]);
        });
    });
    describe('Promise.all', () => {
        test('resolve', async () => {
            expect(
                await BestPromise.all([fulfilled(1, 30), fulfilled(2, 20), fulfilled(3)]),
            ).toEqual([1, 2, 3]);
        });
        test('reject', async () => {
            await expect(
                Promise.resolve(BestPromise.all([fulfilled(1), rejected(2, 20), fulfilled(3, 30)])),
            ).rejects.toBe(2);
        });
    });
    test('Promise.allSettled', async () => {
        expect(
            await BestPromise.allSettled([fulfilled(1, 30), rejected(2, 20), fulfilled(3)]),
        ).toEqual([
            { status: 'fulfilled', value: 1 },
            { status: 'rejected', reason: 2 },
            { status: 'fulfilled', value: 3 },
        ]);
    });
    describe('finally', () => {
        test.each(['resolve', 'reject'])('%s', async (state) => {
            let called = false;
            await new Promise<void>((done) => {
                (state === 'resolve' ? fulfilled(1) : rejected(1)).finally(() => {
                    called = true;
                    done();
                });
            });
            expect(called).toBe(true);
        });
        test('sync', () => {
            let called = false;
            BestPromise.resolve(1).finally(() => {
                called = true;
            });
            expect(called).toBe(true);
        });
    });
    describe('then', () => {
        test('resolve', async () => {
            expect(await fulfilled(1).then((value) => value + 1)).toBe(2);
        });
        test('reject', async () => {
            expect(await rejected(1).then(ANY_OP, (value) => value + 1)).toBe(2);
        });
        describe('return promise', () => {
            test('resolve', async () => {
                expect(await fulfilled(1).then((value) => fulfilled(value + 1))).toBe(2);
            });
            test('reject', async () => {
                expect(
                    await rejected(1)
                        .then(DEFAULT_OP, (value) => rejected(value + 1))
                        .then(DEFAULT_OP, DEFAULT_OP),
                ).toBe(2);
            });
        });
        test('return fn', async () => {
            const value = await BestPromise.resolve(() => {})
                .then(DEFAULT_OP)
                .catch((error) => error.toString());
            expect(value).toBe('TypeError: 返回值请不要传递非Promise函数!');
        });
    });
    test('settles only once', async () => {
        expect(
            await new BestPromise<number>((resolve, reject) => {
                resolve(1);
                reject(2);
            }),
        ).toBe(1);
    });
});
