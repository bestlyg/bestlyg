import { request } from '@/utils';

export async function login(data: { code: string; encryptedData: string; iv: string }) {
    return request<{
        accessToken: string;
        avatar: string;
        createTime: string;
        deleted: boolean;
        gender: number;
        name: string;
        roleKey: number;
        updateTime: string;
        wechatOpenId: string;
        _id: string;
    }>({
        url: '/auth/wechat',
        method: 'POST',
        data,
    });
}
