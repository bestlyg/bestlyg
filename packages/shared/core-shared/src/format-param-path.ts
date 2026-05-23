/** 按顺序用参数替换路径中的 `{name}` 占位符。 */
export function formatParamPath(path: string, ...args: string[]) {
    let i = 0;
    return path.replace(/\{(\w+?)\}/g, () => args[i++]);
}
