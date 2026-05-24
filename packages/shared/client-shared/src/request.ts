import { ResponseEntity } from '@bestlyg/core-shared';
import axios from 'axios';
import * as tapable from 'tapable';

declare const __MODE__: string;

/** 当前前端运行模式，由构建时 __MODE__ 注入，缺省为 development。 */
export const MODE = typeof __MODE__ !== 'undefined' ? __MODE__ : 'development';

/** 共享 axios 实例，按运行模式选择 API baseURL。 */
export const instance = axios.create({
    baseURL: MODE === 'production' ? 'https://www.bestlyg.com' : 'http://localhost:10000',
});

/** client-shared 请求生命周期 hooks。 */
export const hooks = Object.freeze({
    onError: new tapable.AsyncParallelHook<[ResponseEntity<any>]>(['entity']),
});

/** 发起统一 API 请求，自动携带 x-token 并解包 ResponseEntity。 */
export type RequestSerializer = 'json' | 'form';
export type RequestResponseType = 'json' | 'blob' | 'arraybuffer';

export async function request<Req = any, Res = any>({
    url,
    method,
    data,
    serializer = 'json',
    responseType = 'json',
}: {
    method: string;
    url: string;
    serializer?: RequestSerializer;
    responseType?: RequestResponseType;
    data: Req;
}): Promise<Res | null> {
    try {
        const token = localStorage.getItem('x-token');
        method = method.toLowerCase();
        const config: Parameters<typeof instance.request>[0] = {
            url,
            method,
            responseType,
            headers: {},
        };
        if (!config.headers) config.headers = {};
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (method === 'get') config.params = data;
        else if (serializer === 'form') {
            config.data = data;
        } else config.data = data;
        const resp = await instance.request(config);
        if (responseType !== 'json') return resp.data as Res;
        const entity = ResponseEntity.from<any>(resp.data);
        if (entity.getCode() !== 0) throw entity;
        return entity.getData();
    } catch (err: any) {
        await hooks.onError.promise(err).catch(() => {});
        return null;
    }
}
