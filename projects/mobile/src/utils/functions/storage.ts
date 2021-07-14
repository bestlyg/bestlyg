import Taro from '@tarojs/taro';

export const setStorage = (data: Record<string, unknown>) =>
  Object.entries(data).forEach(([k, v]) => {
    try {
      Taro.setStorageSync(k, v);
    } catch (error) {}
  });

export const getStorage = (data: string[]) => data.map(k => Taro.getStorageSync(k));
export const clearStorage = () => Taro.clearStorageSync();
