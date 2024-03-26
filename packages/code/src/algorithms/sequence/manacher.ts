function createString(str: string) {
    let ans = '#';
    for (const ch of str) ans += ch + '#';
    return ans;
}
export function manacher(str: string): string {
    if (str.length === 0) return '';
    str = createString(str);
    const n = str.length;
    const max = { id: -1, radius: -1 };
    const arr = new Array(n).fill(0);
    let ans = str[0];
    for (let i = 0; i < n; i++) {
        if (i <= max.radius) arr[i] = Math.min(arr[2 * max.id - i], max.radius - i);
        let l = i - arr[i];
        let r = i + arr[i];
        while (l - 1 >= 0 && r + 1 <= n - 1 && str[l - 1] === str[r + 1]) {
            l--;
            r++;
        }
        if (r > max.radius) {
            max.radius = r;
            max.id = i;
        }
        arr[i] = r - i;
        if (ans.length < r - l + 1) ans = str.substring(l, r + 1);
    }
    return ans.replace(/#/g, '');
}
