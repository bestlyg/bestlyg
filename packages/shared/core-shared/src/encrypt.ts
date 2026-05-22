import CryptoJS from 'crypto-js';
/**
 * Base64 编码
 * @param str
 * @returns
 */
export const getCryptoJsBase64 = (str: string) => {
    // 将密码字符串转换为 UTF-8 编码的字节数组
    const utf8Bytes = CryptoJS.enc.Utf8.parse(str);
    // 将字节数组编码为 Base64 字符串
    const base64String = CryptoJS.enc.Base64.stringify(utf8Bytes);
    return base64String;
};

/**
 * Base64 解码
 * @param base64String
 * @returns
 */
export const getCryptoJsParseBase64 = (base64String: string) => {
    const decodedBytes = CryptoJS.enc.Base64.parse(base64String);
    const decodedString = CryptoJS.enc.Utf8.stringify(decodedBytes);
    return decodedString;
};

/**
 * 加密用户ID
 *
 * @param k 密钥
 * @param i 初始化向量
 * @param text 待加密的文本或WordArray对象
 * @returns 加密后的Base64字符串
 */
export function encrypt(text: string | CryptoJS.lib.WordArray, aesKey: string, aesIV: string) {
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
 * @param k 密钥
 * @param i 初始化向量
 * @param text 待加密的文本或WordArray对象
 * @returns 加密后的Base64字符串
 */
export function decrypt(text: string | CryptoJS.lib.CipherParams, aesKey: string, aesIV: string) {
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesIV);
    const encrypted = CryptoJS.AES.decrypt(text, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(CryptoJS.enc.Utf8);
}
