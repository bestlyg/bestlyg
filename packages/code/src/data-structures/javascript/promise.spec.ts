import { ANY_OP, DEFAULT_OP } from '@/shared';
import { isArray } from 'lodash';
import { BestPromise, BestPromiseFulfilledResult, BestPromiseRejectedResult } from './promise';
describe('Promise', () => {
    test('Promise.resolve', () => {
        BestPromise.resolve(1).then(val => {
            expect(val).toBe(1);
        });
    });
    test('Promise.reject', () => {
        BestPromise.reject(1).catch(val => {
            expect(val).toBe(1);
        });
    });
    describe('Promise.race', () => {
        test('resolve', () => {
            const arr = [
                new BestPromise(r => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise(r => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise(r => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.race(arr).then(val => {
                expect(val).toBe(1);
            });
        });
        test('reject', () => {
            const arr = [
                new BestPromise((_, r) => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise(r => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise(r => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.race(arr).catch(val => {
                expect(val).toBe(1);
            });
        });
    });
    describe('Promise.any', () => {
        test('resolve', () => {
            const arr = [
                new BestPromise(r => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise(r => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise(r => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.any(arr).then(val => {
                expect(val).toBe(1);
            });
        });
        test('reject', () => {
            const arr = [
                new BestPromise((_, r) => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise((_, r) => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise((_, r) => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.any(arr).catch(val => {
                expect(isArray(val)).toBeTruthy();
                let i = 1;
                (val as Array<any>).forEach(v => {
                    expect(v).toBe(i++);
                });
            });
        });
    });
    describe('Promise.all', () => {
        test('resolve', () => {
            const arr = [
                new BestPromise(r => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise(r => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise(r => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.all(arr).then(val => {
                expect(isArray(val)).toBeTruthy();
                let i = 1;
                (val as Array<any>).forEach(v => {
                    expect(v).toBe(i++);
                });
            });
        });
        test('reject', () => {
            const arr = [
                new BestPromise(r => {
                    jest.setTimeout(100);
                    r(1);
                }),
                new BestPromise((_, r) => {
                    jest.setTimeout(200);
                    r(2);
                }),
                new BestPromise(r => {
                    jest.setTimeout(300);
                    r(3);
                }),
            ];
            BestPromise.all(arr).catch(val => {
                expect(val).toBe(2);
            });
        });
    });
    describe('Promise.allSettled', () => {
        const arr = [
            new BestPromise(r => {
                jest.setTimeout(100);
                r(1);
            }),
            new BestPromise((_, r) => {
                jest.setTimeout(200);
                r(2);
            }),
            new BestPromise(r => {
                jest.setTimeout(300);
                r(3);
            }),
        ];
        BestPromise.allSettled(arr).then(val => {
            expect(isArray(val)).toBeTruthy();
            for (let i = 0, l = arr.length; i < l; i++) {
                const list = val[i];
                if (i === 0 || i === 2) {
                    expect(list.status).toBe('fulfilled');
                    expect((list as BestPromiseFulfilledResult<number>).value).toBe(i + 1);
                } else if (i === 1) {
                    expect(list.status).toBe('rejected');
                    expect((list as BestPromiseRejectedResult).reason).toBe(i + 1);
                }
            }
        });
    });
    describe('finally', () => {
        test('resolve', async () => {
            new BestPromise(resolve => {
                setTimeout(() => {
                    resolve(1);
                }, 0);
            }).finally(() => {});
        });
        test('reject', async () => {
            new BestPromise((resolve, reject) => {
                setTimeout(() => {
                    reject(1);
                }, 0);
            }).finally(() => {});
        });
        test('sync', () => {
            const val = 0;
            BestPromise.resolve(1).finally(() => {
                expect(val).toBe(0);
            });
        });
    });
    describe('then', () => {
        test('resolve', async () => {
            const res = await new BestPromise<number>(r => {
                jest.setTimeout(100);
                r(1);
            }).then(res => res + 1);
            expect(res).toBe(2);
        });
        test('reject', async () => {
            const res = await new BestPromise<number>((_, r) => {
                jest.setTimeout(100);
                r(1);
            }).then(ANY_OP, res => res + 1);
            expect(res).toBe(2);
        });
        describe('return promise', () => {
            test('resolve', async () => {
                const res = await new BestPromise<number>(r => {
                    jest.setTimeout(100);
                    r(1);
                }).then(
                    res =>
                        new BestPromise(r => {
                            r(res + 1);
                        }),
                );
                expect(res).toBe(2);
            });
            test('reject', async () => {
                const res = await new BestPromise<number>((_, r) => {
                    jest.setTimeout(100);
                    r(1);
                })
                    .then(
                        DEFAULT_OP,
                        res =>
                            new BestPromise((_, r) => {
                                r(res + 1);
                            }),
                    )
                    .then(DEFAULT_OP, DEFAULT_OP);
                expect(res).toBe(2);
            });
        });
        describe('return fn', () => {
            test('resolve', async () => {
                const res = await new BestPromise<any>(r => {
                    jest.setTimeout(100);
                    r(() => {});
                })
                    .then(DEFAULT_OP)
                    .catch(err => err.toString());
                expect(res).toBe('TypeError: 返回值请不要传递非Promise函数!');
            });
        });
    });
    describe('exception', () => {
        test('resolve ,reject', async () => {
            new BestPromise((resolve, reject) => {
                resolve(1);
                reject(2);
            }).then(res => {
                expect(res).toBe(1);
            });
        });
    });
});
