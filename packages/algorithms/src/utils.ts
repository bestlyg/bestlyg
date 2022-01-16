export function getPrimes(max: number) {
  const primes: number[] = new Array(max + 1).fill(0);
  for (let i = 2; i <= max; i++) {
    if (primes[i] === 0) primes[++primes[0]] = i;
    for (let j = 1; j <= primes[0] && i * primes[j] <= max; j++) {
      primes[i * primes[j]] = 1;
      if (i % primes[j] === 0) break;
    }
  }
  return primes;
}
export function phi(n: number) {
  let ans = n;
  for (let i = 2; i ** 2 < n; i++) {
    if (n % i === 0) ans = ans * (1 - 1 / i);
    while (n % i === 0) n /= i;
  }
  if (n !== 1) ans = ans * (1 - 1 / n);
  return ans;
}
export function gcd(a: number, b: number) {
  if (b) return gcd(b, a % b);
  return a;
}
export function ex_gcd(
  a: number,
  b: number
): {
  ans: number;
  x: number;
  y: number;
} {
  if (b === 0) return { ans: a, x: 1, y: 0 };
  const res = ex_gcd(b, a % b);
  [res.x, res.y] = [res.y, res.x - Math.floor(a / b) * res.y];
  return res;
}
/**
 *
 * @param a 底数
 * @param b 指数
 * @param c 取模
 * @return a ^ b % c
 */
export function quick_mod(a: number, b: number, c: number = Infinity) {
  let ans = 1;
  let tmp = a;
  while (b) {
    if (b & 1) ans = (ans * tmp) % c;
    tmp = tmp ** 2 % c;
    b >>= 1;
  }
  return ans;
}
export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
