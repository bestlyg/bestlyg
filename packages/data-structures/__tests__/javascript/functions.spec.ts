import { debounce, throttle, newInstance } from '../../src';
describe('functions', () => {
  test('debounce', async () => {
    let v = 0;
    const fn = debounce(100);
    fn(() => {
      v++;
    });
    fn(() => {
      v++;
    });
    expect(v).toBe(0);
  });
  test('throttle', async () => {
    let v = 0;
    const fn = throttle(100);
    fn(() => {
      v++;
    });
    fn(() => {
      v++;
    });
    expect(v).toBe(0);
  });
  test('new', async () => {
    function Obj(a: number) {
      this.a = a;
    }
    const obj = newInstance(Obj, 1);
    expect(obj.a).toBe(1);
  });
});
