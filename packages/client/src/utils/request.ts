import { ResponseEntity } from '@bestlyg/common';
import axios from 'axios';
import * as tapable from 'tapable';

declare const __MODE__: 'development' | 'production' | undefined;

export const instance = axios.create({
    baseURL: __MODE__ === 'production' ? 'https://www.bestlyg.com' : 'http://localhost:10000',
});

export const hooks = Object.freeze({
    onError: new tapable.AsyncParallelHook<[ResponseEntity<any>]>(['entity']),
});

export async function request<Req = any, Res = any>({
    url,
    method,
    data,
}: {
    method: string;
    url: string;
    serializer: string;
    data: Req;
}): Promise<Res | null> {
    try {
        const token = localStorage.getItem('x-token');
        method = method.toLowerCase();
        const config: Parameters<typeof instance.request>[0] = {
            url,
            method,
            headers: {},
        };
        if (!config.headers) config.headers = {};
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (method === 'get') config.params = data;
        else config.data = data;
        const resp = await instance.request(config);
        const entity = ResponseEntity.from<any>(resp.data);
        if (entity.getCode() !== 0) throw entity;
        return entity.getData();
    } catch (err: any) {
        await hooks.onError.promise(err).catch(() => {});
        return null;
    }
}
