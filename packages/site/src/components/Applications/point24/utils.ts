/**
 * 随机数
 * @param min
 * @param max
 * [0, 1)
 * [0, max - min + 1)
 * [min, max + 1)
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/** 精确度 */
export const EPSILON = 1e-6;
