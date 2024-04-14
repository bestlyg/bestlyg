export function getMapkey(key: string, value: string) {
    return `${key}|${value}`;
}
export function toReg(key: string) {
    return new RegExp(`^${key}$`, 'i');
}

export const REG_ANY = '[\\S\\s]*';

export interface ReplaceData {
    key?: string;
    value?: string;
    replaceKey?: string;
    replaceValue?: string;
}
