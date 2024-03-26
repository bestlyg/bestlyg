/**
 * 线性筛
 * @param max 最大值
 * @returns 素数数组
 */
export function getDualPrime(max: number) {
    const primes: number[] = new Array(max + 1).fill(0);
    for (let i = 2; i <= max; i++) {
        // 当prime是0时为素数，在primes[0]中标记
        if (primes[i] === 0) primes[++primes[0]] = i;
        // 遍历所有素数与当前数的乘积
        for (let j = 1; j <= primes[0] && i * primes[j] <= max; j++) {
            // 都标记为非素数
            primes[i * primes[j]] = 1;
            // 当前遍历到的素数是i的质因子时弹出
            if (i % primes[j] === 0) break;
        }
    }
    return primes.slice(1, primes[0] + 1);
}
/**
 * 埃氏筛
 * @param max 最大值
 * @returns 素数数组
 */
export function getEratosthenesPrime(max: number) {
    const primes: number[] = new Array(max + 1).fill(0);
    const ans: number[] = [];
    primes[0] = primes[1] = 1;
    for (let i = 2; i <= max; i++) {
        if (primes[i]) continue;
        ans.push(i);
        for (let j = 2; i * j <= max; j++) primes[i * j] = 1;
    }
    return ans;
}
