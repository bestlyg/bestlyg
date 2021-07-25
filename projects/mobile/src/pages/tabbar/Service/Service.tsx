import { View } from '@tarojs/components';
import React, { useState } from 'react';
import { Loading } from '@/components';
import { useDidShow } from '@tarojs/taro';
import './Service.scss';

export default function Service() {
  const [loading, setLoading] = useState(true);
  useDidShow(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <Loading loading={loading}>
      <View>3</View>
    </Loading>
  );
}
