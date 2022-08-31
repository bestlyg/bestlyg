import Taro from '@tarojs/taro';

export function setStorage(data: Record<string, unknown>): void {
  Object.entries(data).forEach(([k, v]) => {
    try {
      Taro.setStorageSync(k, v);
    } catch (error) {}
  });
}
export function getStorage(data: string[]): string[] {
  return data.map(k => Taro.getStorageSync(k));
}
export function clearStorage(): void {
  Taro.clearStorageSync();
}
