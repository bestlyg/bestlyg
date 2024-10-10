import { expect, test, describe } from 'vitest';
import _ from 'lodash';
import { genList } from 'g-x';

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
