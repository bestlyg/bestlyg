import { useStore } from '@/store';
import { Button, View } from '@tarojs/components';
import React from 'react';
import './global.scss';

definePageConfig({
  navigationBarTitleText: 'Store 演示',
});
export default function Store() {
  const { state, dispatch, actions } = useStore(state => state.counter.data);
  const { state: store } = useStore();
  return (
    <View style={{ width: '100vw', height: '100vh' }}>
      <View>
        <View>Counter</View>
        {state}
        <Button
          onClick={() => {
            dispatch(actions.counter.add());
          }}
        >
          add
        </Button>
        <Button
          onClick={() => {
            dispatch(actions.counter.asyncAdd(2));
          }}
        >
          asyncAdd
        </Button>
      </View>
      <View>
        <View>Person</View>
        {store.person.age}
      </View>
      <Button onClick={() => dispatch(actions.counter.update(1))}>update</Button>
    </View>
  );
}
