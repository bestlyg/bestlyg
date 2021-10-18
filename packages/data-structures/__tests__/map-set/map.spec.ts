import { TreeMap, Map, HashMap } from '../../src';

const list = [TreeMap, HashMap];
list.forEach(run);
function run(Cstr: new (compare) => Map<number, string>) {
  describe(`Map 【${Cstr.name}】`, () => {
    let map!: Map<number, string>;
    beforeEach(() => {
      map = new Cstr((k1, k2) => k1 - k2);
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
      expect(map.remove(103)).toBeFalsy();
      new Array(7)
        .fill(0)
        .map((_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .forEach((v, i) => {
          expect(map.remove(v)).toBeTruthy();
          expect(map.contains(v)).toBeFalsy();
          expect(map.size).toBe(6 - i);
        });
      expect(map.remove(13)).toBeFalsy();
    });
    test('spec remove', () => {
      [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
        map.set(v, v + '');
      });
      // 103 7 hash值相同
      expect(map.remove(103)).toBeFalsy();
      new Array(7)
        .fill(0)
        .map((_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .forEach((v, i) => {
          expect(map.remove(v)).toBeTruthy();
          expect(map.contains(v)).toBeFalsy();
          expect(map.size).toBe(6 - i);
        });
      expect(map.remove(13)).toBeFalsy();
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
    describe('common test', () => {
      test('test1', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 100];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test2', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 1];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test3', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 62];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test4', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 64];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test5', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 93];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test6', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 95];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test7', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 11.5];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test8', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 13];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test9', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 29];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test10', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 31];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test11', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 47];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test12', () => {
        const list = [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12, 49];
        list.forEach(v => map.set(v, v + ''));
        list.forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test13', () => {
        const list = [50, 24, 80, 12, 30];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [12];
        removeList.forEach(v => map.remove(v));
        [50, 24, 80, 30].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test14', () => {
        const list = [50, 24, 80, 12, 30];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [30];
        removeList.forEach(v => map.remove(v));
        [50, 24, 80, 12].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test15', () => {
        const list = [50, 24, 80, 60];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 60].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test16', () => {
        const list = [50, 24, 80, 100];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 100].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test17', () => {
        const list = [50, 24, 80, 12, 30];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 12, 30].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test18', () => {
        const list = [50, 24, 80, 12];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 12].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test19', () => {
        const list = [50, 24, 80, 30];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 30].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test20', () => {
        const list = [50, 24, 80, 12, 30];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [30, 80];
        removeList.forEach(v => map.remove(v));
        [50, 24].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test21', () => {
        const list = [50, 24, 80, 12, 30, 32];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [80];
        removeList.forEach(v => map.remove(v));
        [50, 24, 12, 30, 32].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test22', () => {
        const list = [50, 24, 80, 12];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [50, 80, 12].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test23', () => {
        const list = [50, 24, 80, 25];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [50, 80, 25].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test24', () => {
        const list = [50, 24, 80, 60, 90];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [50, 80, 60, 90].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test25', () => {
        const list = [50, 24, 80, 60];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [60, 50, 80].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test26', () => {
        const list = [50, 24, 80, 90];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [50, 90, 80].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test27', () => {
        const list = [50, 24, 80, 60];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [60, 24];
        removeList.forEach(v => map.remove(v));
        [50, 80].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test28', () => {
        const list = [50, 24, 80, 60, 90, 95];
        list.forEach(v => map.set(v, v + ''));
        const removeList = [24];
        removeList.forEach(v => map.remove(v));
        [80, 50, 90, 60, 95].forEach(v => expect(map.contains(v)).toBeTruthy());
      });
      test('test29', () => {
        const list = [10, 50, 100, 60, 180, 55, 54];
        list.forEach(v => map.set(v, v + ''));
        expect(map.size).toBe(7);
      });
    });
  });
}
