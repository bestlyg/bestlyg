import { callApi } from './utils';
import type { Sidebar } from '@bestlyg/core-shared';

const clientControllerApiMap = {
    getDocsSidebars: {
        method: 'get',
        path: '/api/client/docs/sidebars',
    },
    getLeetcodeSidebars: {
        method: 'get',
        path: '/api/client/leetcode/sidebars',
    },
} as const;

export type ClientGetDocsSidebarsApiRequest = void;
export type ClientGetDocsSidebarsApiResponse = Sidebar;
export async function clientGetDocsSidebars(): Promise<ClientGetDocsSidebarsApiResponse | null> {
    return callApi<ClientGetDocsSidebarsApiResponse>({
        endpoint: clientControllerApiMap.getDocsSidebars,
    });
}

export type ClientGetLeetcodeSidebarsApiRequest = void;
export type ClientGetLeetcodeSidebarsApiResponse = Sidebar;
export async function clientGetLeetcodeSidebars(): Promise<ClientGetLeetcodeSidebarsApiResponse | null> {
    return callApi<ClientGetLeetcodeSidebarsApiResponse>({
        endpoint: clientControllerApiMap.getLeetcodeSidebars,
    });
}
