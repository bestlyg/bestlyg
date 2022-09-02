import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { miniprogram, request } from '@/config';
import * as crypto from 'crypto';

@Injectable()
export class WechatService {
  static AccessTokenKey = 'WechatService-AccessToken';
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  checkError(data: WechatResponse<unknown>) {
    if (data.errcode !== undefined && data.errcode !== 0) throw data.errmsg;
  }
  /**
   * @url https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
   */
  async getAccessToken() {
    const cache = await this.cacheManager.get<string>(
      WechatService.AccessTokenKey,
    );
    if (cache !== undefined) return cache;
    const res = await request(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${miniprogram.appid}&secret=${miniprogram.secret}`,
    );
    const data: WechatResponse<{
      access_token: string; //获取到的凭证
      expires_in: number; //凭证有效时间，单位：秒。目前是7200秒之内的值。
    }> = await res.json();
    this.checkError(data);
    await this.cacheManager.set(
      WechatService.AccessTokenKey,
      data.access_token,
      { ttl: data.expires_in },
    );
    return data.access_token;
  }
  async code2Session(code: string) {
    const res = await request(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${miniprogram.appid}&secret=${miniprogram.secret}&js_code=${code}&grant_type=authorization_code`,
    );
    const data: WechatResponse<{
      openid: string; //	用户唯一标识
      session_key: string; //	会话密钥
      unionid?: string; //	用户在开放平台的唯一标识符，若当前小程序已绑定到微信开放平台帐号下会返回，详见 UnionID 机制说明。
    }> = await res.json();
    this.checkError(data);
    return data;
  }
  decryptData<T>(sessionKey: string, encryptedData: string, iv: string): T {
    return new WXBizDataCrypt(miniprogram.appid, sessionKey).decryptData(
      encryptedData,
      iv,
    );
  }
}

class WXBizDataCrypt {
  constructor(private appId: string, private sessionKey: string) {}
  decryptData(encryptedData: string, iv: string) {
    // base64 decode
    const sessionKeyBuffer = Buffer.from(this.sessionKey, 'base64');
    const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');
    let decoded: any;
    try {
      // 解密
      const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        sessionKeyBuffer,
        ivBuffer,
      );
      // 设置自动 padding 为 true，删除填充补位
      const data: ArrayBufferView = new Int8Array(encryptedDataBuffer);
      decipher.setAutoPadding(true);
      decoded = decipher.update(data as any, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
}

type WechatResponse<T> = T & {
  errcode?: number; //错误码
  errmsg?: string; //错误信息
};
