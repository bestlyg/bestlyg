import { View, Text } from '@tarojs/components';
import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { classnames, noop } from '@/utils';
import { AtIcon } from 'taro-ui';
import styles from './index.module.scss';

export interface NavConfig {
  left?: {
    back?: boolean;
    backColor?: string;
    color?: string;
    title?: string | null;
    prefix?: React.ReactNode | null;
    suffix?: React.ReactNode | null;
    onClick?: () => void;
  };
  center?: {
    color?: string;
    title?: string | null;
    prefix?: React.ReactNode | null;
    suffix?: React.ReactNode | null;
    onClick?: () => void;
  };
}
export default function Nav({ config }: { config: NavConfig }) {
  const leftConfig: NavConfig['left'] = useMemo(() => {
    const data: NavConfig['left'] = {
      back: false,
      backColor: '#000000',
      color: '#000000',
      title: null,
      prefix: null,
      suffix: null,
      onClick: noop,
    };
    Object.entries(config.left ?? {}).forEach(([k, v]) => (data[k] = v));
    return data;
  }, [config]);
  const centerConfig: NavConfig['center'] = useMemo(() => {
    const data: NavConfig['center'] = {
      color: '#000000',
      title: null,
      prefix: null,
      suffix: null,
      onClick: noop,
    };
    Object.entries(config.center ?? {}).forEach(([k, v]) => (data[k] = v));
    return data;
  }, [config]);
  const menuInfo = useMemo(() => Taro.getMenuButtonBoundingClientRect(), []);
  const lineHeight = useMemo(() => menuInfo.top + 'px', [menuInfo]);
  return (
    <View
      className={classnames('global-center', styles.container)}
      style={{
        height: menuInfo.bottom - menuInfo.top,
        top: menuInfo.top + 2,
      }}
    >
      <View
        className={classnames('global-center', styles.left)}
        style={{ lineHeight }}
        onClick={leftConfig.onClick}
      >
        {leftConfig.back && (
          <AtIcon
            value="chevron-left"
            size="20"
            color={leftConfig.backColor}
            className={styles.back}
          />
        )}
        {leftConfig.prefix}
        {leftConfig.title && <Text className={styles.title}>{leftConfig.title}</Text>}
        {leftConfig.suffix}
      </View>
      <View
        className={classnames('global-center', styles.center)}
        style={{ lineHeight, color: centerConfig.color }}
      >
        {centerConfig.prefix}
        {centerConfig.title && <Text className={styles.title}>{centerConfig.title}</Text>}
        {centerConfig.prefix}
      </View>
      <View className={classnames('global-center', styles.right)} style={{ lineHeight }}></View>
    </View>
  );
}
