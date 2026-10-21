import { cbc } from '@noble/ciphers/aes.js';

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

function encodeBase64(bytes: Uint8Array): string {
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function decodeBase64(base64: string): Uint8Array {
    return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

/** 将 UTF-8 字符串编码为 Base64；保留原导出名称以兼容现有调用。 */
export const getCryptoJsBase64 = (str: string) => encodeBase64(encoder.encode(str));

/** 将 Base64 解码为 UTF-8 字符串；保留原导出名称以兼容现有调用。 */
export const getCryptoJsParseBase64 = (base64: string) => decoder.decode(decodeBase64(base64));

/** 使用 AES-CBC + PKCS7 同步加密，返回与现有协议兼容的 Base64 密文。 */
export function encrypt(text: string | Uint8Array, aesKey: string, aesIV: string): string {
    const plaintext = typeof text === 'string' ? encoder.encode(text) : text;
    return encodeBase64(cbc(encoder.encode(aesKey), encoder.encode(aesIV)).encrypt(plaintext));
}

/** 使用 AES-CBC + PKCS7 同步解密 Base64 密文。 */
export function decrypt(text: string, aesKey: string, aesIV: string): string {
    return decoder.decode(
        cbc(encoder.encode(aesKey), encoder.encode(aesIV)).decrypt(decodeBase64(text)),
    );
}
