import '@bestlyg/cli/globals';
import dayjs from 'dayjs';
import axios, { AxiosInstance } from 'axios';
import { Xuan } from '../external';

const { config } = best;

export async function login(request: AxiosInstance, username: string, password: string) {
    const resp = await request.post('/api/auth/login', {
        username,
        password,
    });

    if (resp.data.code !== 0) throw resp.data;
    return resp.data.data;
}

export async function createRequest() {
    const request = axios.create({ baseURL: 'http://127.0.0.1:10000' });
    const loginResult = await login(request, config.auth.username, config.auth.password);
    request.defaults.headers.Authorization = 'Bearer ' + loginResult.accessToken;
    return request;
}

export const getDate = (s: string | undefined, customDayjs: (v: dayjs.Dayjs) => dayjs.Dayjs) =>
    customDayjs(dayjs(s)).format('YYYY-MM-DD');
export const nDaysAgo = (n: number) => getDate(undefined, v => v.subtract(n, 'day'));
export const today = nDaysAgo(0);
export const yesterday = nDaysAgo(1);

export async function createXuanData(request: AxiosInstance, dataList: Partial<Xuan>[]) {
    const res = await request.post('/api/database/xuan', dataList);
    return res.data.data;
}
