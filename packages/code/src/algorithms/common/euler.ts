export function phi(n: number) {
  let ans = n;
  for (let i = 2; i ** 2 <= n; i++) {
    // 求出n的素因子
    if (n % i === 0) ans = (ans / i) * (i - 1);
    while (n % i === 0) n /= i;
  }
  if (n !== 1) ans = (ans / n) * (n - 1);
  return ans;
}
