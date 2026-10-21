import { createCipheriv, createDecipheriv } from 'node:crypto';

function cipherOptions(aesKey: string, aesIV: string) {
    const key = Buffer.from(aesKey, 'utf8');
    const iv = Buffer.from(aesIV, 'utf8');
    if (![16, 24, 32].includes(key.length)) {
        throw new RangeError('AES key must contain 16, 24, or 32 UTF-8 bytes');
    }
    return { algorithm: `aes-${key.length * 8}-cbc`, key, iv };
}

/** 使用 Node 原生 AES-CBC + PKCS7 加密用户 ID，保留原 Base64 密文格式。 */
export function encryptUserId(text: string | Uint8Array, aesKey: string, aesIV: string): string {
    const { algorithm, key, iv } = cipherOptions(aesKey, aesIV);
    const cipher = createCipheriv(algorithm, key, iv);
    const plaintext = typeof text === 'string' ? Buffer.from(text, 'utf8') : text;
    return Buffer.concat([cipher.update(plaintext), cipher.final()]).toString('base64');
}

/** 使用 Node 原生 AES-CBC + PKCS7 解密用户 ID。 */
export function decryptUserId(base64: string, aesKey: string, aesIV: string): string {
    const { algorithm, key, iv } = cipherOptions(aesKey, aesIV);
    const decipher = createDecipheriv(algorithm, key, iv);
    return new TextDecoder('utf-8', { fatal: true }).decode(
        Buffer.concat([decipher.update(Buffer.from(base64, 'base64')), decipher.final()]),
    );
}
