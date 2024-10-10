import { expect, test, describe } from 'vitest';
import _ from 'lodash';
import {
    genList,
    genLoop,
    genSample,
    assertIteratorYieldResult,
    genUndefined,
    genSkip,
} from 'generator-helpers';

const MAX_COUNT = 100;
const list = _.times(MAX_COUNT).map(() => _.random(1, MAX_COUNT ** 2));
console.log(list);

describe('genList', () => {
    test('start', () => {
        const start = 10;
        const arr = Array.from(genList({ list, start }));
        expect(arr).toStrictEqual(list.slice(start));
    });
    test('end', () => {
        const end = 10;
        const arr = Array.from(genList({ list, end }));
        expect(arr).toStrictEqual(list.slice(0, end));
    });
    test('offset', () => {
        const offset = 10;
        const arr = Array.from(genList({ list, offset }));
        expect(arr).toStrictEqual(list.filter((_, i) => i % offset === 0));
    });
    test('mod', () => {
        const mod = 3;
        const g = genList({ list, mod });
        const arr = _.times(10).map(() => g.next().value);
        expect(arr).toStrictEqual(_.times(10).map((_, i) => list[i % mod]));
    });
    test('pick', () => {
        const g = genList({ list, pick: (list, index) => list[index % 3] });
        const arr = _.times(10).map(() => g.next().value);
        expect(arr).toStrictEqual(_.times(10).map((_, i) => list[i % 3]));
    });
});

describe('genLoop', () => {
    test('common', () => {
        const cnt = 2;
        const g = genLoop({ list });
        const arr = _.times(MAX_COUNT * cnt).map(() => g.next().value);
        expect(arr).toStrictEqual(_.times(cnt, () => list).flat());
    });
});

describe('genSample', () => {
    test('common', () => {
        const g = genSample({ list });
        _.times(MAX_COUNT, () => assertIteratorYieldResult(g.next()).value).forEach(num =>
            expect(list.includes(num)).toBeTruthy(),
        );
    });
});

describe('genUndefined', () => {
    test('common', () => {
        const g = genUndefined(MAX_COUNT);
        expect(_.times(MAX_COUNT, () => g.next().value).every(v => v === undefined)).toBeTruthy();
    });
});

describe('genSkip', () => {
    test('common', () => {
        const g = genSkip({ g: genList({ list }) });
        expect(_.times(MAX_COUNT, () => g.next().value).every(v => v !== undefined)).toBeTruthy();
    });
    test('beforeSkipCount', () => {
        const cnt = 3;
        const g = genSkip({ g: genList({ list }), mountSkipCount: cnt });
        const arr = Array.from(g);
        expect(arr.slice(0, cnt).every(v => v === undefined)).toBeTruthy();
        expect(arr.slice(cnt).every((v, i) => v === list[i])).toBeTruthy();
    });
});
/**
async function createQuestionTask<T extends Generator>(config: {
  fileName: string;
  g: T;
  createLabel: (data: PickValue<T>) => string;
  askTasks?: ReturnType<typeof createAskTask>[];
  askChunkSize?: number;
}) {}
 */
