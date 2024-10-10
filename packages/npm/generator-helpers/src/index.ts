function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function* genList<T>({
    list,
    start = 0,
    end = list.length,
    offset = 1,
    mod = Infinity,
    pick = (list, i) => list[i],
}: {
    list: T[];
    start?: number;
    end?: number;
    offset?: number;
    mod?: number;
    pick?: (list: T[], index: number) => T;
}) {
    console.log('genList', { list, start, end, offset, mod, pick });
    for (let i = start; i < end; i = (i + offset) % mod) {
        yield pick(list, i);
    }
}

export function* genLoop<T>(config: Parameters<typeof genList<T>>[0]) {
    yield* genList({
        mod: config.list.length,
        ...config,
    });
}

export function* genSample<T>(config: Parameters<typeof genList<T>>[0]) {
    yield* genList({
        pick: list => list[random(0, list.length - 1)],
        ...config,
    });
}

export function* genUndefined<T>(
    config: Partial<Parameters<typeof genList<T>>[0]> & { count: number },
): Generator<undefined, void, unknown> {
    yield* genList({
        list: [0],
        start: 0,
        end: config.count,
        pick: () => undefined,
        ...config,
    });
}

export function* genSkipFunction<T extends Generator>({
    genData,
    beforeSkipCount = 0,
    afterSkipCount = 0,
    mountSkipCount = 0,
    unmountSkipCount = 0,
}: {
    genData: T;
    beforeSkipCount?: number;
    afterSkipCount?: number;
    mountSkipCount?: number;
    unmountSkipCount?: number;
}) {
    yield* genUndefined({ count: mountSkipCount });
    while (true) {
        yield* genUndefined({ count: beforeSkipCount });
        const v = genData.next();
        if (v.done) break;
        yield v.value as PickValue<T>;
        yield* genUndefined({ count: afterSkipCount });
    }
    yield* genUndefined({ count: unmountSkipCount });
}

export type PickValue<T> = T extends Generator<infer R> ? R : never;
export type PickReturn<T> = T extends Generator<any, infer R> ? R : never;
export type PickNext<T> = T extends Generator<any, infer R> ? R : never;

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
