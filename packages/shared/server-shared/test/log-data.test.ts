import { describe, expect, it } from 'vitest';
import {
    formatLogData,
    NON_JSON_LOG_DATA_PLACEHOLDER,
    SENSITIVE_LOG_DATA_PLACEHOLDER,
    TRUNCATED_LOG_DATA_PLACEHOLDER,
} from '../src/log-data';

describe('formatLogData', () => {
    it('keeps JSON data and omits unsafe payloads', () => {
        const jsonData = { name: 'bestlyg', values: [1, 'a', true] };
        const deepData = { a: { b: { c: { d: { e: { f: 'too deep' } } } } } };
        const wideData = Array.from({ length: 60 }, (_, index) => index);
        const longText = 'a'.repeat(1200);

        expect(formatLogData(jsonData)).toStrictEqual(jsonData);
        expect(formatLogData(Buffer.from('demo'))).toBe(NON_JSON_LOG_DATA_PLACEHOLDER);
        expect(formatLogData({ file: Buffer.from('demo') })).toBe(NON_JSON_LOG_DATA_PLACEHOLDER);
        expect(JSON.stringify(formatLogData(deepData))).toContain(TRUNCATED_LOG_DATA_PLACEHOLDER);
        expect(formatLogData(wideData)).toHaveLength(51);
        expect(String(formatLogData(longText))).toContain(TRUNCATED_LOG_DATA_PLACEHOLDER);
    });

    it('redacts sensitive fields by key name', () => {
        expect(
            formatLogData({
                token: 'abc',
                nested: {
                    password: 'secret',
                    normal: 'visible',
                },
                authorizationHeader: 'Bearer abc',
                cookie: 'sid=1',
            }),
        ).toStrictEqual({
            token: SENSITIVE_LOG_DATA_PLACEHOLDER,
            nested: {
                password: SENSITIVE_LOG_DATA_PLACEHOLDER,
                normal: 'visible',
            },
            authorizationHeader: SENSITIVE_LOG_DATA_PLACEHOLDER,
            cookie: SENSITIVE_LOG_DATA_PLACEHOLDER,
        });
    });
});
