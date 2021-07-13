import { View, Text } from '@tarojs/components';
import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { classnames } from '@/utils';
import styles from './index.module.scss';

export default function Title({
  title,
  titleColor = '#000000',
}: {
  title: string;
  titleColor?: string;
}) {
  const menuInfo = useMemo(() => Taro.getMenuButtonBoundingClientRect(), []);
  return (
    <View
      className={classnames('global-center', styles.container)}
      style={{
        height: menuInfo.bottom - menuInfo.top,
        top: menuInfo.top,
      }}
    >
      <View className={styles.title} style={{ lineHeight: menuInfo.top + 'px', color: titleColor }}>
        <Text>{title}</Text>
      </View>
    </View>
  );
}
