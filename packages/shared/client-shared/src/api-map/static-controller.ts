import { callApi } from './utils';

const staticControllerApiMap = {
    getStaticFile: {
        method: 'get',
        path: '/static',
    },
} as const;

export type StaticGetStaticFileApiRequest = { p: string; r: boolean | string };
export type StaticGetStaticFileApiResponse = string;
export async function staticGetStaticFile(
    input: StaticGetStaticFileApiRequest,
): Promise<StaticGetStaticFileApiResponse | null> {
    return callApi<StaticGetStaticFileApiResponse>({
        endpoint: staticControllerApiMap.getStaticFile,
        query: input as any,
    });
}
