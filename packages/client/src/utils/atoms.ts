import * as idl from '@bestlyg/common/idl/client';
import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { sidebarCategories } from './constants';

export const activeSidebarCategoryAtom = atom(
    sidebarCategories.find(v => location.pathname.startsWith(v.path)),
);

export const sidebarPromiseAtom = atom(get => {
    const activeSidebarCategory = get(activeSidebarCategoryAtom);
    const sidebarPromise = activeSidebarCategory?.request({});
    return { sidebarPromise };
});

export const sidebarAtom = atom(get => get(sidebarPromiseAtom).sidebarPromise);

export const activeSidebarItemAtom = atom<idl.api.bestlyg.SidebarItem | undefined>();

export interface UserInfo {
    nickname: string;
    description: string;
    avatar: string;
}

export const userInfoAtom = atomWithStorage<UserInfo | null>('userInfo', null);
