export function formatParamPath(path: string, ...args: string[]) {
    let i = 0;
    return path.replace(/\{(\w+?)\}/g, () => args[i++]);
}
