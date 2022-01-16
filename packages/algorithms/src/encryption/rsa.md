---
title: RSA
nav:
  title: 算法
  path: /algorithms
  order: 3
group:
  title: 加密算法
  path: /encryption
  order: 3
---

# RSA(RSA)

利用大素数相乘求出的非对称加密算法

1. 随机找出两个大素数$p$,$q$,相乘为$n$
1. 利用欧拉函数求出$phi(n) = (p - 1) * (q - 1)$
1. 取一个与$phi(n)$互质的数$e$
1. 求出$d$,使$(e \times d) \% phi(n) = 1$
1. 加密钥匙为(e,n), 加密过程为$c = m^e \% n$
1. 揭秘钥匙为(d,n), 加密过程为$m = c^d \% n$

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/algorithms/src/encryption/rsa.ts)

```ts
export function bruteForce(text: string, pattern: string): number {
  const len = pattern.length;
  for (let i = 0; text[i]; i++) {
    const substr = text.substr(i, len);
    if (substr === pattern) return i;
  }
  return -1;
}
```
