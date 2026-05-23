import CryptoJS from 'crypto-js';

/**
 * 加密用户ID
 *
 * @param text 待加密的文本或WordArray对象
 * @param aesKey 密钥
 * @param aesIV 初始化向量
 * @returns 加密后的Base64字符串
 */
export function encryptUserId(
    text: string | CryptoJS.lib.WordArray,
    aesKey: string,
    aesIV: string,
) {
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesIV);
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
 * 解密用户ID
 *
 * @param base64 待解密的密文，可以是Base64字符串或CipherParams对象
 * @param aesKey 密钥
 * @param aesIV 初始化向量
 * @returns 解密后的用户ID字符串
 */
export function decryptUserId(
    base64: string | CryptoJS.lib.CipherParams,
    aesKey: string,
    aesIV: string,
) {
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesIV);
    const encrypted = CryptoJS.AES.decrypt(base64, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(CryptoJS.enc.Utf8);
}
