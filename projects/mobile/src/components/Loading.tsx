import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';

export default function Loading({
  children,
  loading,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    loading ? Taro.showLoading({ title: '加载中' }) : Taro.hideLoading();
  }, [loading]);
  return <>{loading || children}</>;
}
