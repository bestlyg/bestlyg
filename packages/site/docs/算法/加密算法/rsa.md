import CodeSource from '!!raw-loader!@bestlyg/code/src/algorithms/encryption/rsa.ts';
import CodeBlock from '@theme/CodeBlock';

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



## 核心代码

<CodeBlock language="tsx">{CodeSource}</CodeBlock>