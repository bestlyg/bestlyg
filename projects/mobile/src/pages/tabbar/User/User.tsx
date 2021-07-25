import { View } from '@tarojs/components';
import React from 'react';
import { Nav } from '@/components';
import './User.scss';

export default function User() {
  return (
    <View>
      <Nav
        config={{
          left: {
            back: true,
            title: 'centertitlecentertitlecentertitlecentertitlecentertitlecentertitle',
          },
          center: {},
        }}
      />
    </View>
  );
}
