import dayjs from 'dayjs';
import axios, { AxiosInstance } from 'axios';

export async function login({
    username,
    password,
    request,
}: {
    request: AxiosInstance;
    username: string;
    password: string;
}) {
    const resp = await request.post('/api/auth/login', {
        username,
        password,
    });

    console.log(resp);
    return resp.data.data;
}

export async function createRequest() {
    const request = axios.create({ baseURL: 'http://127.0.0.1:10000' });
    const loginResult = await login({ request, username: '1', password: '1' });
    request.defaults.headers.Authorization = 'Bearer ' + loginResult.accessToken;
    return request;
}

export const getDate = (s: string | undefined, customDayjs: (v: dayjs.Dayjs) => dayjs.Dayjs) =>
    customDayjs(dayjs(s)).format('YYYY-MM-DD');
export const nDaysAgo = (n: number) => getDate(undefined, v => v.subtract(n, 'day'));
export const today = nDaysAgo(0);
export const yesterday = nDaysAgo(1);
