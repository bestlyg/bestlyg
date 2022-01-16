export function phi(n: number) {
  let ans = n;
  for (let i = 2; i ** 2 < n; i++) {
    // 求出n的素因子
    if (n % i === 0) ans = ans * (1 - 1 / i);
    while (n % i === 0) n /= i;
  }
  if (n !== 1) ans = ans * (1 - 1 / n);
  return ans;
}
