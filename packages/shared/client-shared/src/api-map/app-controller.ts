import { callApi } from './utils';
import type { sse } from '@bestlyg/core-shared';

const appControllerApiMap = {
    sse: {
        method: 'post',
        path: '/api/sse',
    },
} as const;

export type AppSseApiRequest = {
    data: string;
    endIdx?: number;
    startIdx?: number;
    offset?: number;
    pickLength?: number;
    sleepTime: number;
};
export type AppSseApiResponse = unknown;
export async function appSse(input: AppSseApiRequest): Promise<AppSseApiResponse> {
    return callApi<AppSseApiResponse>({
        endpoint: appControllerApiMap.sse,
        body: input,
    });
}

export type AppSseFetchOptions = {
    headers?: HeadersInit;
};

export function appSseFetch(
    eventSource: sse.EventSource,
    input: AppSseApiRequest,
    options: AppSseFetchOptions = {},
) {
    return eventSource.fetch(appControllerApiMap.sse.path, {
        method: appControllerApiMap.sse.method,
        headers: options.headers,
        body: JSON.stringify(input),
    });
}
