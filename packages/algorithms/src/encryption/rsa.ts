import { getPrimes, gcd, ex_gcd, random } from '../utils';

// 从素数表的[n - cnt, n]的范围内取值
const cnt = 100;

export function rsa(max: number) {
  // 获取max以下的素数表
  const primes = getPrimes(max);
  //   console.log(`prime size = ${primes[0]}, last = ${primes[primes[0]]}`);
  // 从素数表中随机选取两个素数
  let p!: number;
  let q!: number;
  do {
    p = primes[random(primes[0] - cnt, primes[0])];
    q = primes[random(primes[0] - cnt, primes[0])];
  } while (p === q);
  // 根据p,q求出n,phi_n
  const n = p * q;
  const phi_n = (p - 1) * (q - 1);
  //   console.log(`p = ${p}, q = ${q}, n = ${n}, phi_n = ${phi_n}`);
  // 随机取得与phi_n互质的数字e
  let e!: number;
  do {
    e = random(Math.max(p, q) + 1, phi_n - 1);
  } while (gcd(e, phi_n) !== 1);
  // 利用扩展欧几里得求出d,使e * d % phi_n = 1
  let { x: d } = ex_gcd(e, phi_n);
  d = (d + phi_n) % phi_n;
  //   console.log(`e = ${e}, d = ${d}`);
  //   console.log(`${e} * ${d} % ${phi_n} == ${(BigInt(e) * BigInt(d)) % BigInt(phi_n)}`);
  return {
    e,
    d,
    n,
  };
}
