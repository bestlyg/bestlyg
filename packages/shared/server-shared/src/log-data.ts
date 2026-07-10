export const NON_JSON_LOG_DATA_PLACEHOLDER = '[non-json data omitted]';
export const TRUNCATED_LOG_DATA_PLACEHOLDER = '[log data truncated]';
export const SENSITIVE_LOG_DATA_PLACEHOLDER = '[sensitive data omitted]';

const MAX_LOG_DATA_DEPTH = 5;
const MAX_LOG_DATA_ENTRIES = 50;
const MAX_LOG_DATA_STRING_LENGTH = 1000;
const MAX_LOG_DATA_NODES = 1000;
const SENSITIVE_LOG_KEY_PATTERN = /(?:token|secret|password|authorization|cookie)/i;

type FormatLogDataResult = { ok: true; value: unknown } | { ok: false };

export function formatLogData(data: unknown) {
    try {
        const result = formatJsonLogData(
            data,
            0,
            { remainingNodes: MAX_LOG_DATA_NODES },
            new WeakSet<object>(),
        );
        return result.ok ? result.value : NON_JSON_LOG_DATA_PLACEHOLDER;
    } catch {
        return NON_JSON_LOG_DATA_PLACEHOLDER;
    }
}

function formatJsonLogData(
    data: unknown,
    depth: number,
    budget: { remainingNodes: number },
    seen: WeakSet<object>,
): FormatLogDataResult {
    if (budget.remainingNodes-- <= 0) return { ok: true, value: TRUNCATED_LOG_DATA_PLACEHOLDER };
    if (data == null || typeof data === 'boolean') return { ok: true, value: data };
    if (typeof data === 'number')
        return Number.isFinite(data) ? { ok: true, value: data } : { ok: false };
    if (typeof data === 'string') return { ok: true, value: truncateLogString(data) };
    if (typeof data !== 'object') return { ok: false };
    if (isBinaryData(data)) return { ok: false };

    const payload = data as {
        constructor?: { name?: string };
        getHeaders?: unknown;
        pipe?: unknown;
        readable?: unknown;
    };
    if (payload.constructor?.name === 'FormData' || typeof payload.getHeaders === 'function')
        return { ok: false };
    if (typeof payload.pipe === 'function' || payload.readable === true) return { ok: false };
    if (depth >= MAX_LOG_DATA_DEPTH) return { ok: true, value: TRUNCATED_LOG_DATA_PLACEHOLDER };
    if (seen.has(data)) return { ok: false };

    seen.add(data);
    const result = Array.isArray(data)
        ? formatLogArray(data, depth, budget, seen)
        : formatLogObject(data, depth, budget, seen);
    seen.delete(data);
    return result;
}

function formatLogArray(
    data: unknown[],
    depth: number,
    budget: { remainingNodes: number },
    seen: WeakSet<object>,
): FormatLogDataResult {
    const items: unknown[] = [];
    for (const item of data.slice(0, MAX_LOG_DATA_ENTRIES)) {
        const result = formatJsonLogData(item, depth + 1, budget, seen);
        if (!result.ok) return result;
        items.push(result.value);
    }
    if (data.length > MAX_LOG_DATA_ENTRIES) {
        items.push(
            `${TRUNCATED_LOG_DATA_PLACEHOLDER}: ${data.length - MAX_LOG_DATA_ENTRIES} more items`,
        );
    }
    return { ok: true, value: items };
}

function formatLogObject(
    data: object,
    depth: number,
    budget: { remainingNodes: number },
    seen: WeakSet<object>,
): FormatLogDataResult {
    if (!isPlainObject(data)) return { ok: false };

    const formatted: Record<string, unknown> = {};
    const entries = Object.entries(data).slice(0, MAX_LOG_DATA_ENTRIES);
    for (const [key, value] of entries) {
        if (SENSITIVE_LOG_KEY_PATTERN.test(key)) {
            formatted[key] = SENSITIVE_LOG_DATA_PLACEHOLDER;
            continue;
        }
        const result = formatJsonLogData(value, depth + 1, budget, seen);
        if (!result.ok) return result;
        formatted[key] = result.value;
    }
    const omitted = Object.keys(data).length - MAX_LOG_DATA_ENTRIES;
    if (omitted > 0) {
        formatted.__truncated__ = `${TRUNCATED_LOG_DATA_PLACEHOLDER}: ${omitted} more keys`;
    }
    return { ok: true, value: formatted };
}

function truncateLogString(data: string) {
    if (data.length <= MAX_LOG_DATA_STRING_LENGTH) return data;
    return `${data.slice(0, MAX_LOG_DATA_STRING_LENGTH)}...${TRUNCATED_LOG_DATA_PLACEHOLDER}: ${
        data.length - MAX_LOG_DATA_STRING_LENGTH
    } more chars`;
}

function isBinaryData(data: object) {
    return Buffer.isBuffer(data) || data instanceof ArrayBuffer || ArrayBuffer.isView(data);
}

function isPlainObject(data: object) {
    const proto = Object.getPrototypeOf(data);
    return proto === Object.prototype || proto === null;
}
