import { TreeMap, Map } from '../../src';
describe('TreeMap', () => {
  let map!: Map<number, string>;
  beforeEach(() => {
    map = new TreeMap((k1, k2) => k1 - k2);
  });
  test('size', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      map.set(v, v + '');
    });
    expect(map.size).toBe(7);
  });
  test('empty', () => {
    map.set(1, '');
    map.clear();
    expect(map.empty).toBeTruthy();
  });
  test('contains', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      map.set(v, v + '');
    });
    expect(map.contains(7)).toBeTruthy();
    expect(map.contains(8)).toBeFalsy();
  });
  test('remove', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      map.set(v, v + '');
    });
    new Array(7)
      .fill(0)
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map((v, i) => {
        console.log(v);
        return v;
      })
      .forEach((v, i) => {
        console.log('remove', v);
        map.remove(v);
        expect(map.contains(v)).toBeFalsy();
        expect(map.size).toBe(6 - i);
      });
  });
  test('get', () => {
    let str = '';
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      map.set(v, (str += v));
    });
    expect(map.get(1)).toBe('1');
    expect(map.get(2)).toBe('122');
    expect(map.get(3)).toBe('1223');
    expect(map.get(4)).toBe('122344');
    expect(map.get(5)).toBe('1223445');
    expect(map.get(6)).toBe('122344566');
    expect(map.get(7)).toBe('12234456677777');
    expect(map.get(8)).toBeUndefined();
  });
});
