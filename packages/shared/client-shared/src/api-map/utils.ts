import { request, type RequestResponseType, type RequestSerializer } from '../request';

export type ApiEndpoint = Readonly<{
    method: string;
    path: string;
}>;

export type ApiPathParams = Record<string, string | number | boolean | null | undefined>;
export type ApiQueryParams = Record<string, unknown> | undefined;

export function resolveApiPath(endpoint: ApiEndpoint, params: ApiPathParams = {}) {
    return endpoint.path.replace(/\{([^}]+)\}/g, (_matched, key: string) => {
        if (!Object.prototype.hasOwnProperty.call(params, key) || params[key] == null) {
            throw new Error(`Missing api path param: ${key}`);
        }
        return encodeURIComponent(String(params[key]));
    });
}

export function appendApiQuery(url: string, query: ApiQueryParams = undefined) {
    if (!query) return url;
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        searchParams.set(key, String(value));
    }
    const queryString = searchParams.toString();
    if (!queryString) return url;
    return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
}

export async function callApi<Response>({
    endpoint,
    params,
    query,
    body,
    serializer = 'json',
    responseType = 'json',
}: {
    endpoint: ApiEndpoint;
    params?: ApiPathParams;
    query?: ApiQueryParams;
    body?: unknown;
    serializer?: RequestSerializer;
    responseType?: RequestResponseType;
}) {
    const method = endpoint.method.toLowerCase();
    const path = resolveApiPath(endpoint, params);
    const url = method === 'get' ? path : appendApiQuery(path, query);
    const data = method === 'get' ? query : body;
    return request<unknown, Response>({
        url,
        method: endpoint.method,
        data,
        serializer,
        responseType,
    });
}
