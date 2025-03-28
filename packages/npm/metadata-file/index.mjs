import { isCJS } from 'module-checker';
import path from 'path';
import url from 'url';

export const DefaultCallerIndex = 2;

export function getFilename(callerIndex = DefaultCallerIndex) {
    const obj = Object.create(null);
    Error.captureStackTrace(obj);
    const stack = obj.stack.toString();
    const caller = stack.split('\n')[callerIndex];
    if (isCJS()) {
        const filePath = caller.match(/\((.*?):\d*?:\d*?\)/)?.[1];
        return filePath;
    } else {
        const fileUrl = caller.match(/(file:\/\/\/.*?):\d*?:\d*?/)?.[1];
        const filePath = url.fileURLToPath(fileUrl);
        return filePath;
    }
}

export function getDirname() {
    return path.dirname(getFilename(DefaultCallerIndex + 1));
}
