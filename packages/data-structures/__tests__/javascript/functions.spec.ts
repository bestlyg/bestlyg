import { debounce, throttle, newInstance } from '../../src';
describe('functions', () => {
  test('debounce', () => {
    let v = 0;
    const fn = debounce(100);
    return new Promise<void>(resolve => {
      fn(() => {
        v = 1;
        resolve();
      });
      fn(() => {
        v = 2;
        resolve();
      });
    }).then(() => {
      expect(v).toBe(2);
    });
  });
  test('throttle', async () => {
    let v = 0;
    const fn = throttle(100);
    return new Promise<void>(resolve => {
      fn(() => {
        v = 1;
        resolve();
      });
      fn(() => {
        v = 2;
        resolve();
      });
    }).then(() => {
      expect(v).toBe(1);
    });
  });
  describe('new', () => {
    test('return void', async () => {
      function Obj(a: number) {
        this.a = a;
      }
      const obj = newInstance(Obj, 1);
      expect(obj.a).toBe(1);
    });
    test('return instance', async () => {
      function Obj(a: number) {
        this.a = a;
        return this;
      }
      const obj = newInstance(Obj, 1);
      expect(obj.a).toBe(1);
    });
  });
});
