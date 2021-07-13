import { View, Text } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

export default function NoData() {
  return (
    <View className={styles.noData}>
      <Text>-没有更多了-</Text>
    </View>
  );
}
