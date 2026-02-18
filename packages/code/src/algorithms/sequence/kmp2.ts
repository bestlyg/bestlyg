function getNext(pattern: string): number[] {
    const n = pattern.length;
    const ans: number[] = new Array(n).fill(-1);
    for (let i = 1, j = -1; i < n; i++) {
        while (j !== -1 && pattern[j + 1] !== pattern[i]) j = ans[j];
        if (pattern[j + 1] === pattern[i]) j++;
        ans[i] = j;
    }
    return ans;
}
const COUNT = 26;
const codeA = 'a'.codePointAt(0)!;
/**
 *
 * @param pattern
 * @param next
 * @returns 返回跳跃数组，表示当j的值为i时，且j的下一个的值为j时，进行跳跃
 */
function getJump(pattern: string, next: number[]): number[][] {
    const n = pattern.length;
    const ans: number[][] = new Array(n).fill(0).map((_) => new Array(COUNT).fill(-1));
    ans[-1] = new Array(COUNT).fill(-1);
    ans[-1][pattern.codePointAt(0)! - codeA] = 0;
    for (let i = 0; i < n; i++) {
        const nextI = next[i];
        ans[i] = [...ans[nextI]];
        ans[i][pattern.codePointAt(i + 1)! - codeA] = i + 1;
    }
    return ans;
}
export function kmp2(text: string, pattern: string): number {
    const next = getNext(pattern);
    const jump = getJump(pattern, next);
    const n = text.length;
    for (let i = 0, j = -1; i < n; i++) {
        j = jump[j][text.codePointAt(i)! - codeA];
        if (j === pattern.length - 1) return i - pattern.length + 1;
    }
    return -1;
}
