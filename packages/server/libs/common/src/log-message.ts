function getCircularReplacer() {
    const seen = new WeakSet();
    return function (_key: string, value: unknown) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
        }
        return value;
    };
}

export function safeToString(value: unknown): string {
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.stack || value.message;
    try {
        return JSON.stringify(value, getCircularReplacer());
    } catch {
        return '[Logger stringify failed]';
    }
}

export function formatLogMessage(...args: unknown[]): string {
    return args.map(safeToString).join(' ');
}
