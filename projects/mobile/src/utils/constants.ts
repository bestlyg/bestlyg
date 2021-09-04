import { Page, pageUrlMap } from '@/app.config';
import Taro from '@tarojs/taro';

export const VERSION = __VERSION__;
export const SERVICE_URL = __SERVICE_URL__;
export const ENV_DEV = __ENV_DEV__;
export const ENV_PROD = __ENV_PROD__;
export const TAG_ENV = __TAG_ENV__.toUpperCase() as Taro.ENV_TYPE;
export const TAG_END = __TAG_END__;

export const ASYNC = Promise.resolve();
export const pageRouteMap: Map<string, Page> = [...pageUrlMap.entries()].reduce<Map<string, Page>>(
  (obj, [k, v]) => {
    obj.set(v, k);
    return obj;
  },
  new Map()
);
