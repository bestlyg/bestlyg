import { View, Text } from '@tarojs/components';
import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { classnames, noop } from '@/utils';
import { AtIcon } from 'taro-ui';
import styles from './index.module.scss';

export interface NavConfig {
  container?: { height?: number | string };
  left?: {
    back?: boolean;
    backColor?: string;
    title?: string | null;
    titleStyle?: React.CSSProperties;
    prefix?: React.ReactNode | null;
    suffix?: React.ReactNode | null;
    onClick?: () => void;
    onBack?: () => void;
  };
  center?: {
    title?: string | null;
    titleStyle?: React.CSSProperties;
    prefix?: React.ReactNode | null;
    suffix?: React.ReactNode | null;
    onClick?: () => void;
  };
  bgStyle?: React.CSSProperties;
  extends?: React.ReactNode;
}
export default function Nav({ config }: { config?: NavConfig }) {
  const menuInfo = useMemo(() => Taro.getMenuButtonBoundingClientRect(), []);
  const lineHeight = useMemo(() => menuInfo.top + 'px', [menuInfo]);
  const containerConfig: NavConfig['container'] = useMemo(() => {
    const data: NavConfig['container'] = {
      height: menuInfo.bottom,
    };
    Object.entries(config?.container ?? {}).forEach(([k, v]) => (data[k] = v));
    return data;
  }, [config, menuInfo]);
  const leftConfig: NavConfig['left'] = useMemo(() => {
    const data: NavConfig['left'] = {
      back: false,
      backColor: '#000000',
      title: null,
      prefix: null,
      suffix: null,
      onClick: noop,
      titleStyle: { color: '#000000' },
      onBack: () => Taro.navigateBack(),
    };
    Object.entries(config?.left ?? {}).forEach(([k, v]) => (data[k] = v));
    return data;
  }, [config]);
  const centerConfig: NavConfig['center'] = useMemo(() => {
    const data: NavConfig['center'] = {
      title: null,
      titleStyle: { color: '#000000' },
      prefix: null,
      suffix: null,
      onClick: noop,
    };
    Object.entries(config?.center ?? {}).forEach(([k, v]) => (data[k] = v));
    return data;
  }, [config]);
  return (
    <>
      <View className={styles.container} style={{ height: containerConfig.height }}>
        <View
          className={classnames('global-center', styles.nav)}
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
                onClick={() => leftConfig.onBack?.()}
              />
            )}
            {leftConfig.prefix}
            {leftConfig.title && (
              <Text
                className={classnames('global-text-overflow', styles.title)}
                style={leftConfig.titleStyle}
              >
                {leftConfig.title}
              </Text>
            )}
            {leftConfig.suffix}
          </View>
          <View className={classnames('global-center', styles.center)} style={{ lineHeight }}>
            {centerConfig.prefix}
            {centerConfig.title && (
              <Text
                className={classnames('global-text-overflow', styles.title)}
                style={centerConfig.titleStyle}
              >
                {centerConfig.title}
              </Text>
            )}
            {centerConfig.prefix}
          </View>
          <View className={classnames('global-center', styles.right)} style={{ lineHeight }}></View>
        </View>
        <View style={config?.bgStyle}></View>
        {config?.extends}
      </View>
      <View style={{ height: containerConfig.height }}></View>
    </>
  );
}
