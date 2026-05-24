import { callApi } from './utils';
import type {
    ClientGetDocsSidebarsRequestDto,
    ClientGetDocsSidebarsResponseDto,
    ClientGetLeetcodeSidebarsRequestDto,
    ClientGetLeetcodeSidebarsResponseDto,
} from '@bestlyg/core-shared';

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

export type ClientGetDocsSidebarsApiRequest = ClientGetDocsSidebarsRequestDto;
export type ClientGetDocsSidebarsApiResponse = ClientGetDocsSidebarsResponseDto;
export async function clientGetDocsSidebars(
    input?: ClientGetDocsSidebarsApiRequest,
): Promise<ClientGetDocsSidebarsApiResponse | null> {
    return callApi<ClientGetDocsSidebarsApiResponse>({
        endpoint: clientControllerApiMap.getDocsSidebars,
        query: input as any,
    });
}

export type ClientGetLeetcodeSidebarsApiRequest = ClientGetLeetcodeSidebarsRequestDto;
export type ClientGetLeetcodeSidebarsApiResponse = ClientGetLeetcodeSidebarsResponseDto;
export async function clientGetLeetcodeSidebars(
    input?: ClientGetLeetcodeSidebarsApiRequest,
): Promise<ClientGetLeetcodeSidebarsApiResponse | null> {
    return callApi<ClientGetLeetcodeSidebarsApiResponse>({
        endpoint: clientControllerApiMap.getLeetcodeSidebars,
        query: input as any,
    });
}
