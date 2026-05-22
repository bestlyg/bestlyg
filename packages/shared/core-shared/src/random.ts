/**
 * 随机值[a,b]
 * @param min 最小值
 * @param max 最大值
 */
export function random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
