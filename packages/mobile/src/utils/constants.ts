import Taro from '@tarojs/taro';

export const VERSION = __VERSION__;
export const SERVICE_URL = __SERVICE_URL__;
export const ENV_DEV = __ENV_DEV__;
export const ENV_PROD = __ENV_PROD__;
export const TAG_ENV = __TAG_ENV__;
export const TAG_END = __TAG_END__.toUpperCase() as unknown as typeof Taro.ENV_TYPE;

export const ASYNC = Promise.resolve();
export const SYSTEM = Taro.getSystemInfoSync(); // 获取设备信息
export const DPR = SYSTEM.windowWidth / 750;

/** 正则 手机号 */
export const REG_PHONE = /^1([358][0-9]|4[579]|66|7[0135678]|9[189])\d{8}$/;
/** 正则 身份证 */
export const REG_IDCARD =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
