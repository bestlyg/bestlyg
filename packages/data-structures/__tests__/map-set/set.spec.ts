import { TreeSet, Set } from '../../src';
describe('TreeSet', () => {
  let set!: Set<number>;
  beforeEach(() => {
    set = new TreeSet((k1, k2) => k1 - k2);
  });
  test('size', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      set.add(v);
    });
    expect(set.size).toBe(7);
  });
  test('empty', () => {
    set.add(1);
    set.clear();
    expect(set.empty).toBeTruthy();
  });
  test('contains', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      set.add(v);
    });
    expect(set.contains(7)).toBeTruthy();
    expect(set.contains(8)).toBeFalsy();
  });
  test('remove', () => {
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
      set.add(v);
    });
    new Array(7)
      .fill(0)
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .forEach((v, i) => {
        set.remove(v);
        expect(set.contains(v)).toBeFalsy();
        expect(set.size).toBe(6 - i);
      });
  });
});
