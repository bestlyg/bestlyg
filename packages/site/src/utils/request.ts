import { message } from 'antd';

export async function request(...args: Parameters<typeof fetch>) {
    const token = localStorage.getItem('x-token');
    // args[0] = 'http://localhost:10000' + args[0];
    args[1] ??= {};
    args[1].headers ??= {};
    args[1].headers['Content-Type'] = 'application/json';
    if (token) args[1].headers['Authorization'] = `Bearer ${token}`;
    args[1].body = JSON.stringify(args[1].body);
    const res = await fetch(...args);
    const data = await res.json();
    if (data.code !== 0) {
        message.error(data.msg);
    } else {
        return data.data;
    }
}
