import { describe, expect, it } from '@rstest/core';
import vectors from '../test/fixtures/aes-cbc-cryptojs-4.2.0.json';
import { decrypt, encrypt, getCryptoJsBase64, getCryptoJsParseBase64 } from './encrypt';

describe('AES-CBC protocol compatibility', () => {
    // Frozen outputs from CryptoJS 4.2.0, generated before replacing the dependency.
    it.each(vectors)(
        'preserves legacy ciphertext for %j',
        ({ text, key, iv, ciphertext, base64 }) => {
            expect(encrypt(text, key, iv)).toBe(ciphertext);
            expect(encrypt(new TextEncoder().encode(text), key, iv)).toBe(ciphertext);
            expect(decrypt(ciphertext, key, iv)).toBe(text);
            expect(getCryptoJsBase64(text)).toBe(base64);
            expect(getCryptoJsParseBase64(base64)).toBe(text);
        },
    );

    it('rejects invalid keys and IVs', () => {
        expect(() => encrypt('text', 'short', vectors[0].iv)).toThrow();
        expect(() => encrypt('text', vectors[0].key, 'short')).toThrow();
    });

    it('handles Base64 larger than a JavaScript argument list', () => {
        const text = '中文👋'.repeat(50_000);
        expect(getCryptoJsParseBase64(getCryptoJsBase64(text))).toBe(text);
    });
});
