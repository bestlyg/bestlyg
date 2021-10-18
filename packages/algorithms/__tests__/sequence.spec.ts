import { sequence } from '../src';

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
[sequence.bruteForce, sequence.kmp, sequence.sunday, sequence.shiftAnd].forEach(match =>
  run(match)
);
