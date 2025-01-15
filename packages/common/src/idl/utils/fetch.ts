import { ResponseEntity } from '@/response-entity';
import axios from 'axios';

const request = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production' ? 'http://www.bestlyg.com' : 'http://localhost:10000',
});

export async function fetch<Request, Response>({
    url,
    method,
    data,
}: {
    method: string;
    url: string;
    serializer: string;
    data: Request;
}) {
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
    const res = await request.request(config);
    const resData: Response = res.data;
    return ResponseEntity.from<Response>(resData);
}
