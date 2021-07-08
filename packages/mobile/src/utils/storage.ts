import Taro from '@tarojs/taro';

export const setStorage = (data: Record<string, unknown>) =>
  Object.entries(data).forEach(([key, data]) => Taro.setStorage({ key, data }));
export const setStorageSync = (data: Record<string, unknown>) =>
  Object.entries(data).forEach(([k, v]) => {
    try {
      Taro.setStorageSync(k, v);
    } catch (error) {}
  });

export const getStorage = (data: string[]) =>
  Promise.all(data.map(key => Taro.getStorage({ key }))).then(res => res.map(v => v.data));
export const getStorageSync = (data: string[]) => data.map(k => Taro.getStorageSync(k));
export const clearStorage = () => Taro.clearStorage();
export const clearStorageSync = () => Taro.clearStorageSync();
