import { View } from '@tarojs/components';
import React, { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { Nav } from '@/components';
import './User.scss';

export default function User() {
  return (
    <View>
      <Nav title="标题" />
    </View>
  );
}
