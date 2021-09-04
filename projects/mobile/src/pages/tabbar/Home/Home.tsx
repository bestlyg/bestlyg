import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import React from 'react';
import { useStore, rootKey } from '@/store';
import './Home.scss';

export default function Home() {
  const [{ counter, global }, dispatch] = useStore();
  return (
    <View className="index">
      <Text>{counter.num}</Text>
      <AtButton
        type="primary"
        onClick={() =>
          dispatch({
            type: rootKey.counter.ADD,
            payload: 10,
          })
        }
      >
        add
      </AtButton>
      <AtButton
        type="primary"
        onClick={() =>
          dispatch({
            type: rootKey.counter.ADD2,
            payload: 10,
          })
        }
      >
        add2
      </AtButton>
      <AtButton
        type="primary"
        onClick={() =>
          dispatch({
            type: rootKey.counter.MINUS,
            payload: 10,
          })
        }
      >
        MINUS
      </AtButton>
      <Text>
        {global.location[0]}-{global.location[1]}
      </Text>
    </View>
  );
}
