import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import React from 'react';
import { global } from '@/store';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import './Home.scss';

export default observer(function Home() {
  return (
    <View className="index">
      <View>
        {global.location[0]}-{global.location[1]}
      </View>
      <Item title="标题" />
      <AtButton type="primary" onClick={() => global.add(1)}>
        add
      </AtButton>
      <AtButton type="primary" onClick={() => global.minus(1)}>
        minus
      </AtButton>
      <AtButton type="primary" onClick={() => global.fetch()}>
        async add
      </AtButton>
    </View>
  );
});
