import { common } from '../src';

describe('prime', () => {
  const ans_primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
    197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
    311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
    431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547,
    557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929,
    937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
  ];
  const max = 1000;
  test('DualPrime', () => {
    const primes = common.getDualPrime(max);
    expect(primes).toEqual(ans_primes);
  });
  test('EratosthenesPrime', () => {
    const primes = common.getEratosthenesPrime(max);
    expect(primes).toEqual(ans_primes);
  });
});
describe('functions', () => {
  test('debounce', () => {
    let v = 0;
    const fn = common.debounce(100);
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
    const fn = common.throttle(100);
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
      const obj = common.newInstance(Obj, 1);
      expect(obj.a).toBe(1);
    });
    test('return instance', async () => {
      function Obj(a: number) {
        this.a = a;
        return this;
      }
      const obj = common.newInstance(Obj, 1);
      expect(obj.a).toBe(1);
    });
  });
  describe('random', () => {
    test('random', () => {
      const min = 1;
      const max = 100;
      const cnt = 100;
      for (let i = 0; i < cnt; i++) {
        const random_n = common.random(min, max);
        expect(random_n).toBeGreaterThanOrEqual(min);
        expect(random_n).toBeLessThanOrEqual(max);
      }
    });
  });
});
describe('euclidean', () => {
  test('gcd', () => {
    expect(common.gcd(2, 0)).toBe(2);
    expect(common.gcd(6, 8)).toBe(2);
    expect(common.gcd(31, 56)).toBe(1);
  });
  test('lcm', () => {
    [
      [2, 0],
      [6, 8],
      [31, 56],
    ].forEach(([num1, num2]) => {
      expect(common.lcm(num1, num2)).toBe((num1 * num2) / common.gcd(num1, num2));
    });
  });
});
describe('euler', () => {
  test('common test', () => {
    expect(common.phi(31)).toBe(30);
    expect(common.phi(40)).toBe(16);
    expect(common.phi(15)).toBe(8);
    expect(common.phi(9)).toBe(6);
    expect(common.phi(4)).toBe(2);
  });
});
