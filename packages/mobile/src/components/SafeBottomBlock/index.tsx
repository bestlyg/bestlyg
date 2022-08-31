import { View } from '@tarojs/components';
import React from 'react';
import { useCreation } from 'ahooks';
import Taro from '@tarojs/taro';

export function SafeBottomBlock({ height = 1 }: { height?: number }) {
  const style: React.CSSProperties = useCreation(
    () => ({
      width: '100%',
      height: `calc(env(safe-area-inset-bottom) + ${Taro.pxTransform(height)})`,
    }),
    [height]
  );
  return <View style={style}></View>;
}
