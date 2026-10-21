import { describe, expect, it } from '@rstest/core';
import vectors from '../../core-shared/test/fixtures/aes-cbc-cryptojs-4.2.0.json';
import { decrypt, encrypt } from '../../core-shared/src/encrypt';
import { decryptUserId, encryptUserId } from '../src/user-id-crypto';

describe('native user ID encryption', () => {
    it.each(vectors)(
        'interoperates with legacy and browser AES for %j',
        ({ text, key, iv, ciphertext }) => {
            expect(encryptUserId(text, key, iv)).toBe(ciphertext);
            expect(encryptUserId(new TextEncoder().encode(text), key, iv)).toBe(ciphertext);
            expect(decryptUserId(ciphertext, key, iv)).toBe(text);
            expect(decryptUserId(encrypt(text, key, iv), key, iv)).toBe(text);
            expect(decrypt(encryptUserId(text, key, iv), key, iv)).toBe(text);
        },
    );

    it('rejects invalid keys and IVs', () => {
        expect(() => encryptUserId('text', 'short', vectors[0].iv)).toThrow();
        expect(() => encryptUserId('text', vectors[0].key, 'short')).toThrow();
    });

    it('rejects decrypted bytes that are not valid UTF-8', () => {
        const { key, iv } = vectors[0];
        const ciphertext = encryptUserId(new Uint8Array([0xff]), key, iv);
        expect(() => decryptUserId(ciphertext, key, iv)).toThrow();
        expect(() => decrypt(ciphertext, key, iv)).toThrow();
    });
});
