import unitless from '@emotion/unitless';
import { CSSProperties } from '../types';

export function transformStyleValue<T>(key: string, value: T) {
    if (!unitless[key] && typeof value === 'number' && value !== 0) {
        return value + 'px';
    }
    return value;
}

export function propertyToString<T>(key: string, value: T) {
    return `${key}:${transformStyleValue(key, value)}`;
}

export function propertiesToString(properties: CSSProperties) {
    return Object.entries(properties).reduce((s, [k, v]) => `${s}${propertyToString(k, v)};`, '');
}
