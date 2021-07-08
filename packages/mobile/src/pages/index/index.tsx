import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import React from 'react';
import { useStore, rootKey } from '@/store';
import './index.scss';

export default function Index() {
  const [{ counter, person }, dispatch] = useStore();
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
        {person.name}-{person.age}
      </Text>
      <AtButton
        onClick={() => {
          dispatch({
            type: rootKey.person.SET_AGE,
            payload: person.age + 1,
          });
        }}
      >
        SET_AGE
      </AtButton>
      <AtButton
        onClick={() => {
          dispatch({
            type: rootKey.person.SET_NAME,
            payload: person.name + '1',
          });
        }}
      >
        SET_NAME
      </AtButton>
    </View>
  );
}
