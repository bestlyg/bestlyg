import React from 'react';
import { observer } from 'mobx-react-lite';
import { global } from '@/store';
import { View } from '@tarojs/components';

export default observer(function Item({ title }: { title: string }) {
  return (
    <View>
      <View>{title}</View>
      <View>{global.count}</View>
      <View>{global.doubleCount}</View>
    </View>
  );
});
