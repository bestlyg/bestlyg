export function* genList<T>({
    list = [],
    start = 0,
    end = list.length,
    offset = 1,
    mod = Infinity,
    pick = (list, i) => list[i],
}: {
    list?: T[];
    start?: number;
    end?: number;
    offset?: number;
    mod?: number;
    pick?: (list: T[], index: number) => T;
} = {}) {
    for (let i = start; i < end; i = (i + offset) % mod) {
        // console.log(
        //     `i = ${i}, start = ${start}, end = ${end}, offset = ${offset}, mod = ${mod}, val = ${pick(list, i)}, list = ${list.join(',')}`,
        // );
        yield pick(list, i);
    }
}

export function* genLoop<T>(config: Parameters<typeof genList<T>>[0] = {}) {
    yield* genList({
        mod: config.list?.length ?? 1,
        ...config,
    });
}

export function* genSample<T>(config: Parameters<typeof genList<T>>[0] = {}) {
    function random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    yield* genLoop({
        pick: (list) => list[random(0, list.length - 1)],
        ...config,
    });
}

export function* genValue<T = undefined>({ value, count }: { value?: T; count?: number } = {}) {
    for (let i = 0; i < count; i++) {
        yield value;
    }
}

export function* genUndefined(count: number = 1) {
    yield* genValue({ count });
}

export function* genSkip<G extends Generator>({
    g,
    beforeSkipCount = 0,
    afterSkipCount = 0,
    mountSkipCount = 0,
    unmountSkipCount = 0,
}: {
    g: G;
    beforeSkipCount?: number;
    afterSkipCount?: number;
    mountSkipCount?: number;
    unmountSkipCount?: number;
}): Generator<PickValue<G> | undefined, void, unknown> {
    yield* genUndefined(mountSkipCount);
    while (true) {
        yield* genUndefined(beforeSkipCount);
        const v = g.next();
        if (v.done) break;
        yield v.value as PickValue<G>;
        yield* genUndefined(afterSkipCount);
    }
    yield* genUndefined(unmountSkipCount);
}

export type PickValue<T> = T extends Generator<infer R> ? R : never;
export type PickReturn<T> = T extends Generator<any, infer R> ? R : never;
export type PickNext<T> = T extends Generator<any, any, infer R> ? R : never;

export function* g<T extends Record<string, Generator>>(data: T) {
    const entries = Object.entries(data);
    while (true) {
        const data = entries.map(
            ([k, f]) => [k, f.next()] as [string, ReturnType<(typeof f)['next']>],
        );
        if (data.some(([, v]) => v.done)) break;
        const value = Object.fromEntries(data.map(([k, v]) => [k, v.value])) as {
            [K in keyof T]: PickValue<T[K]>;
        };
        yield value;
    }
}

export function assertIteratorYieldResult<T, R>(result: IteratorResult<T, R>) {
    if (result.done) throw new Error('assert failed', { cause: result });
    return result as IteratorYieldResult<T>;
}

export function assertIteratorReturnResult<T, R>(result: IteratorResult<T, R>) {
    if (!result.done) throw new Error('assert failed', { cause: result });
    return result as IteratorReturnResult<R>;
}
