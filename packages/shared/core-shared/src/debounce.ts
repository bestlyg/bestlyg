import { catchError } from './error';
/**
 * 防抖
 */
export function debounce(time: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (fn: (...args: any[]) => void) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            catchError(fn);
            if (timeout) clearTimeout(timeout);
        }, time);
    };
}
