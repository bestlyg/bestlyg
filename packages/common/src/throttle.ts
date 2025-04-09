import { catchError } from './error';

/**
 * 节流
 */
export function throttle(time: number) {
    let run = false;
    return (fn: (...args: any[]) => void) => {
        if (run) return;
        run = true;
        setTimeout(() => {
            catchError(fn);
            run = false;
        }, time);
    };
}
