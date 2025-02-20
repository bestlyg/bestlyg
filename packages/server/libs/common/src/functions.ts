import { RequestMethod } from '@nestjs/common';

export type NamedRequestMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'ALL'
    | 'OPTIONS'
    | 'HEAD'
    | 'SEARCH'
    | 'PROPFIND'
    | 'PROPPATCH'
    | 'MKCOL'
    | 'COPY'
    | 'MOVE'
    | 'LOCK'
    | 'UNLOCK';

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

export const NamedRequestMethodMapper: Record<string, NamedRequestMethod> = Object.fromEntries(
    Object.keys(RequestMethod)
        .filter(v => !Number.isNaN(Number(v)))
        .flatMap(k => {
            return [[k, RequestMethod[k]]];
        }),
);

export function getRequestMethod(method: string = '') {
    return RequestMethodMapper[method] ?? RequestMethodMapper[0];
}
