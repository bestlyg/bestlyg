/**
 * 欧欧几里得算法
 * 返回a与b的最大公约数
 */
export function gcd(a: number, b: number) {
    if (b) return gcd(b, a % b);
    return a;
}
/**
 * 扩展欧几里得算法
 * 已知a,b
 * 求a * x + b * y == gcd(a,b)中,x与y的一个解
 */
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
 * 返回a与b的最大公倍数
 */
export function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b);
}
