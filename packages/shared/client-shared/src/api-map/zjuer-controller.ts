import { callApi } from './utils';

const zjuerControllerApiMap = {
    toWiki: {
        method: 'get',
        path: '/zjuer/wiki',
    },
} as const;

export type ZjuerToWikiApiRequest = void;
export type ZjuerToWikiApiResponse = unknown;
export async function zjuerToWiki(): Promise<ZjuerToWikiApiResponse> {
    return callApi<ZjuerToWikiApiResponse>({
        endpoint: zjuerControllerApiMap.toWiki,
    });
}
