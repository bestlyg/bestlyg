import { isArray, isString } from 'lodash';
import { PREFIX } from './constants';

const { localStorage } = globalThis;
const internalGetLocalStorage = (item: string): string | null =>
  localStorage.getItem(PREFIX + item);
export function getLocalStorage(item: string): string | null;
export function getLocalStorage(items: string[]): (string | null)[];
export function getLocalStorage(items: string | string[]): (string | null)[] | string | null {
  return isArray(items)
    ? items.map(item => internalGetLocalStorage(item))
    : internalGetLocalStorage(items);
}
const internalSetLocalStorage = (item: string, val: string): void =>
  localStorage.setItem(PREFIX + item, val);
export function setLocalStorage(item: string, val: string): void;
export function setLocalStorage(records: Record<string, unknown>): void;
export function setLocalStorage(item: string | Record<string, unknown>, val?: string): void {
  isString(item)
    ? internalSetLocalStorage(item, val!)
    : Object.entries(item).forEach(([k, v]) => setLocalStorage(k, v + ''));
}
const internalRemoveLocalStorage = (item: string): void => localStorage.removeItem(PREFIX + item);
export function removeLocalStorage(item: string): void;
export function removeLocalStorage(items: string[]): void;
export function removeLocalStorage(items: string | string[]): void {
  isArray(items)
    ? items.forEach(item => internalRemoveLocalStorage(item))
    : internalRemoveLocalStorage(items);
}
export function clearLocalStorage(): void {
  localStorage.clear();
}
