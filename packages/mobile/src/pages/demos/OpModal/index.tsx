import { useStore } from '@/store';
import { Button, View } from '@tarojs/components';
import React from 'react';
import { useOp, OpProps, OpType } from '@/hooks';
import './global.scss';

definePageConfig({
  navigationBarTitleText: 'OpModal 演示',
});
export default function OpModal() {
  const opProps = useOp<number>();
  return (
    <View style={{ width: '100vw', height: '100vh' }}>
      <Button onClick={() => opProps.onHidden()}>hidden</Button>
      <Button onClick={() => opProps.onShow({ payload: 123 })}>create</Button>
      <Button onClick={() => opProps.onShow({ payload: 12345, type: OpType.EDIT })}>edit</Button>
      <Child opProps={opProps}>1</Child>
    </View>
  );
}

function Child({
  opProps: { type, payload, onHidden, visible },
  children,
}: {
  opProps: OpProps;
  children: React.ReactNode;
}) {
  return (
    <View>
      <View>=============Child=============</View>
      {visible && (
        <>
          <View>mode : {type}</View>
          <View>payload : {payload}</View>
          <View>children : {children}</View>
          <Button onClick={() => onHidden()}>hidden</Button>
        </>
      )}
    </View>
  );
}
