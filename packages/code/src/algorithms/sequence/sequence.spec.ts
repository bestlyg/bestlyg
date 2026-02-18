import { bruteForce } from './bruteForce';
import { kmp } from './kmp';
import { shiftAnd } from './shiftAnd';
import { sunday } from './sunday';

const run = (match: (text: string, pattern: string) => number) =>
    describe('Sequence', () => {
        test('head match', () => {
            expect(match('asdas', 'asd')).toBe(0);
        });
        test('tail match', () => {
            expect(match('asdas', 'das')).toBe(2);
        });
        test('no match', () => {
            expect(match('asdas', 'sf')).toBe(-1);
        });
        test('shift and', () => {
            expect(match('asdas', 'asda')).toBe(0);
        });
        test('kmp', () => {
            expect(match('safasqwasdsgasdfasasgaga', 'asdsgasdf')).toBe(7);
        });
    });
[bruteForce, kmp, sunday, shiftAnd].forEach((match) => run(match));
