---
title: RSA
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 加密算法
  path: /encryption
  order: 4
---

# RSA(RSA)

利用大素数相乘求出的非对称加密算法

1. 随机找出两个大素数$p$,$q$,相乘为$n$
1. 利用欧拉函数求出$phi(n) = (p - 1) * (q - 1)$
1. 取一个与$phi(n)$互质的数$e$
1. 求出$d$,使$(e \times d) \% phi(n) = 1$
1. 加密钥匙为(e,n), 加密过程为$c = m^e \% n$
1. 揭秘钥匙为(d,n), 加密过程为$m = c^d \% n$

## 随机得到 e 后求 d

1. 由$e \times d \% phi(n) == 1$可得$e * d + k * phi(n) == gcd(e, phi(n)$
1. 根据扩展欧几里得$e \times x + phi(n) \times y = gcd(e, phi(n))$求出 x,y
1. x 即 d

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/encryption/rsa.ts)

```ts
import { random, getDualPrime, gcd, ex_gcd } from '../common';

// 从素数表的[n - cnt, n]的范围内取值
const cnt = 100;

export function rsa(max: number) {
  // 获取max以下的素数表
  const primes = getDualPrime(max);
  //   console.log(`prime size = ${primes[0]}, last = ${primes[primes[0]]}`);
  // 从素数表中随机选取两个素数
  let p!: number;
  let q!: number;
  do {
    p = primes[random(cnt, primes.length - 1)];
    q = primes[random(cnt, primes.length - 1)];
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
```
