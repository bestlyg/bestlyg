import Taro from '@tarojs/taro';

export const VERSION = __VERSION__;
export const SERVICE_URL = __SERVICE_URL__;
export const ENV_DEV = __ENV_DEV__;
export const ENV_PROD = __ENV_PROD__;
export const TAG_ENV = __TAG_ENV__.toUpperCase() as Taro.ENV_TYPE;
export const TAG_END = __TAG_END__;

export const ASYNC = Promise.resolve();

/** 正则 手机号 */
export const REG_PHONE = /^1([358][0-9]|4[579]|66|7[0135678]|9[189])\d{8}$/;

export const NOOP = function noop() {};
