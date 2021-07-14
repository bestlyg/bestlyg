import { Page, pageUrls } from '@/app.config';

export const getPagePath = (page: Page, params: Record<string, unknown> = {}) =>
  `/${pageUrls[page]}` +
  (Object.keys(params).length === 0 ? '' : '?') +
  Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
export const throwValue = (val: string) => {
  throw val;
};
export const errorLog = (title: string) => {
  Taro.showToast({ title: title.toString(), icon: 'none' });
};
export const getFileSuffix = (name: string) => name.split('.').reverse()[0];
