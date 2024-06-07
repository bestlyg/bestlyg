import { request } from '@/utils';
import { Account, Bill, Type } from './models';

const getUrl = (url: string) => `/application/gang/${url}`;
export async function getAccount() {
    return request<Account[]>({
        url: getUrl('account'),
    });
}

export async function createAccount(data: Partial<Account>) {
    return request<boolean>({
        url: getUrl('account'),
        method: 'POST',
        data,
    });
}

export async function updateAccount(data: Partial<Account>) {
    return request<boolean>({
        url: getUrl('account'),
        method: 'PUT',
        data,
    });
}

export async function getType() {
    return request<Type[]>({
        url: getUrl('type'),
    });
}

export async function createType(data: Partial<Type>) {
    return request<boolean>({
        url: getUrl('type'),
        method: 'POST',
        data,
    });
}

export async function updateType(data: Partial<Type>) {
    return request<boolean>({
        url: getUrl('type'),
        method: 'PUT',
        data,
    });
}

export async function getBill() {
    return request<Bill[]>({
        url: getUrl('bill'),
    });
}

export async function createBill(data: Partial<Bill>) {
    return request<boolean>({
        url: getUrl('bill'),
        method: 'POST',
        data,
    });
}

export async function updateBill(data: Partial<Bill>) {
    return request<boolean>({
        url: getUrl('bill'),
        method: 'PUT',
        data,
    });
}
