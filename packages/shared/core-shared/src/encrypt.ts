import CryptoJS from 'crypto-js';
/**
 * 使用 CryptoJS 将 UTF-8 字符串编码为 Base64。
 * @param str 原始字符串
 * @returns Base64 字符串
 */
export const getCryptoJsBase64 = (str: string) => {
    // 将密码字符串转换为 UTF-8 编码的字节数组
    const utf8Bytes = CryptoJS.enc.Utf8.parse(str);
    // 将字节数组编码为 Base64 字符串
    const base64String = CryptoJS.enc.Base64.stringify(utf8Bytes);
    return base64String;
};

/**
 * 使用 CryptoJS 将 Base64 字符串解码为 UTF-8。
 * @param base64String Base64 字符串
 * @returns 解码后的原始字符串
 */
export const getCryptoJsParseBase64 = (base64String: string) => {
    const decodedBytes = CryptoJS.enc.Base64.parse(base64String);
    const decodedString = CryptoJS.enc.Utf8.stringify(decodedBytes);
    return decodedString;
};

/**
 * 使用 AES-CBC + Pkcs7 加密文本。
 * @param text 待加密的文本或 WordArray 对象
 * @param aesKey AES 密钥
 * @param aesIV AES 初始化向量
 * @returns 加密后的 Base64 密文
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
 * 使用 AES-CBC + Pkcs7 解密密文。
 * @param text 待解密的密文
 * @param aesKey AES 密钥
 * @param aesIV AES 初始化向量
 * @returns 解密后的 UTF-8 字符串
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
