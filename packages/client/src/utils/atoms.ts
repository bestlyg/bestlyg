import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { sidebarCategories } from './constants';
import { SidebarGroup, SidebarItem } from '@bestlyg/common';

export const activeSidebarCategoryAtom = atom<(typeof sidebarCategories)[number] | null>(null);

export const sidebarPromiseAtom = atom(get => {
    const activeSidebarCategory = get(activeSidebarCategoryAtom);
    const sidebarPromise = activeSidebarCategory?.request();
    return { sidebarPromise };
});

export const sidebarAtom = atom(get => get(sidebarPromiseAtom).sidebarPromise);

export const activeSidebarItemAtom = atom<SidebarItem | null>(null);

export const activeSidebarBreadcrumbListAtom = atom<(SidebarItem | SidebarGroup)[] | null>(null);

export interface UserInfo {
    nickname: string;
    description: string;
    avatar: string;
}

export const userInfoAtom = atomWithStorage<UserInfo | null>('userInfo', null);
