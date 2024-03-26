import { random } from '../common';
import { rsa } from './rsa';

function quick_mod(a: bigint, b: bigint, c: bigint) {
    let ans = 1n;
    let tmp = a;
    while (b) {
        if (b % 2n === 1n) ans = (ans * tmp) % c;
        tmp = tmp ** 2n % c;
        b >>= 1n;
    }
    return ans;
}
describe('RSA', () => {
    test('random test', () => {
        const max = 10;
        for (let i = 0; i < max; i++) {
            const { e, d, n } = rsa(1000);
            const [big_e, big_d, big_n] = [e, d, n].map(v => BigInt(v));
            const m = BigInt(random(50, 150));
            const c = quick_mod(m, big_e, big_n);
            expect(quick_mod(c, big_d, big_n)).toBe(m);
        }
    });
});
