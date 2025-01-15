import { RequestMethod } from '@nestjs/common';

export const RequestMethodMapper: Record<string, RequestMethod> = Object.fromEntries(
    Object.keys(RequestMethod)
        .filter(v => Number.isNaN(Number(v)))
        .flatMap(k => {
            return [
                [k, RequestMethod[k]],
                [k.toLowerCase(), RequestMethod[k]],
            ];
        }),
);

export function getRequestMethod(method: string = '') {
    return RequestMethodMapper[method] ?? RequestMethodMapper[0];
}
