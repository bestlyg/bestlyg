import { ResponseEntity } from '@/response-entity';
import axios from 'axios';
import * as tapable from 'tapable';

export const request = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production' ? 'http://www.bestlyg.com' : 'http://localhost:10000',
});

export const hooks = Object.freeze({
    onError: new tapable.AsyncParallelHook<[ResponseEntity<any>]>(['entity']),
});

export async function fetch({
    url,
    method,
    data,
}: {
    method: string;
    url: string;
    serializer: string;
    data: any;
}) {
    try {
        const token = localStorage.getItem('x-token');
        method = method.toLowerCase();
        const config: Parameters<typeof request.request>[0] = {
            url,
            method,
            headers: {},
        };
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (method === 'get') config.params = data;
        else config.data = data;
        const resp = await request.request(config);
        const entity = ResponseEntity.from<any>(resp.data);
        if (entity.getCode() !== 0) throw entity;
        return entity.getData();
    } catch (err) {
        await hooks.onError.promise(err).catch(() => {});
        return null;
    }
}
