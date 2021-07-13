import { View, Text } from '@tarojs/components';
import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { classnames } from '@/utils';
import { AtIcon } from 'taro-ui';
import styles from './index.module.scss';

const back = () => Taro.navigateBack();
export default function Title({
  title,
  titleColor = '#000000',
  titleAlign = 'center',
  backColor = '#000000',
  backVisible = false,
  onBack = back,
}: {
  title: string;
  titleAlign?: 'left' | 'center';
  backVisible?: boolean;
  titleColor?: string;
  backColor?: string;
  onBack?: () => void;
}) {
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
        onClick={onBack}
      >
        {backVisible && (
          <AtIcon value="chevron-left" size="20" color={backColor} className={styles.back} />
        )}
        {titleAlign === 'left' && <Text className={styles.title}>{title}</Text>}
      </View>
      <View
        className={classnames('global-center', styles.center)}
        style={{ lineHeight, color: titleColor }}
      >
        {titleAlign === 'center' && <Text className={styles.title}>{title}</Text>}
      </View>
      <View className={classnames('global-center', styles.right)} style={{ lineHeight }}>
        <AtIcon value="chevron-left" size="30" color={backColor}></AtIcon>
      </View>
    </View>
  );
}
