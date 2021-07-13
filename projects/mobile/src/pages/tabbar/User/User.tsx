import { View } from '@tarojs/components';
import React from 'react';
import { Nav } from '@/components';
import './User.scss';

export default function User() {
  return (
    <View>
      <Nav
        title="用户"
        titleColor="#ffffff"
        titleAlign="center"
        onBack={() => {
          console.log('back');
        }}
        backVisible
        backColor="#ffffff"
      />
    </View>
  );
}
