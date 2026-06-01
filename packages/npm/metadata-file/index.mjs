import path from 'path';
import url from 'url';

export const DefaultCallerIndex = 2;
const explicitFileHint =
    'Unable to resolve caller filename. Pass import.meta.url in ESM or __filename in CJS.';

function fileURLToPath(fileUrl) {
    try {
        return url.fileURLToPath(fileUrl);
    } catch {
        return undefined;
    }
}

// Prefer explicit metadata from import.meta.url or __filename; stack parsing is only a fallback.
function normalizeFileInput(input) {
    if (input instanceof URL) {
        return fileURLToPath(input);
    }
    if (input && typeof input === 'object' && typeof input.url === 'string') {
        return normalizeFileInput(input.url);
    }
    if (typeof input !== 'string' || !input) {
        return undefined;
    }
    if (input.startsWith('file://')) {
        return fileURLToPath(input);
    }
    // Non-file URLs cannot be mapped to a local dirname.
    if (input.startsWith('node:') || /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(input)) {
        return undefined;
    }
    return path.resolve(input);
}

// V8 CallSite objects are more stable than matching formatted stack strings.
function getStackFilename(callerIndex) {
    const originalPrepareStackTrace = Error.prepareStackTrace;
    const obj = Object.create(null);
    try {
        Error.prepareStackTrace = (_, callSites) => callSites;
        Error.captureStackTrace(obj);
        const stack = obj.stack;
        if (!Array.isArray(stack)) {
            return undefined;
        }
        const callSite = stack[callerIndex];
        const fileName = callSite?.getFileName?.() ?? callSite?.getScriptNameOrSourceURL?.();
        return normalizeFileInput(fileName);
    } finally {
        Error.prepareStackTrace = originalPrepareStackTrace;
    }
}

// Passing import.meta.url or __filename keeps paths stable after bundling.
export function getFilename(input = DefaultCallerIndex) {
    const filePath =
        typeof input === 'number' ? getStackFilename(input) : normalizeFileInput(input);
    if (!filePath) {
        throw new Error(explicitFileHint);
    }
    return filePath;
}

// Kept as a convenience wrapper around getFilename for module-local path helpers.
export function getDirname(input = DefaultCallerIndex + 1) {
    return path.dirname(getFilename(input));
}
