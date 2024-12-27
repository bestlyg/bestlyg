import { message } from 'antd';
import { ResponseEntity } from '@bestlyg/common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function useRequest() {
    const { siteConfig } = useDocusaurusContext();
    const apiUrl = siteConfig.customFields.apiUrl;
    async function request<T>(...args: Parameters<typeof fetch>) {
        const token = localStorage.getItem('x-token');
        if (typeof args[0] === 'string') args[0] = apiUrl + args[0];
        args[1] ??= {};
        args[1].headers ??= {};
        args[1].headers['Content-Type'] = 'application/json';
        if (token) args[1].headers['Authorization'] = `Bearer ${token}`;
        args[1].body = JSON.stringify(args[1].body);
        const res = await fetch(...args);
        const data = ResponseEntity.from<T>(await res.json());
        if (data.getCode() !== 0) {
            message.error(data.getMsg());
        } else {
            return data.getData();
        }
    }
    return request;
}
