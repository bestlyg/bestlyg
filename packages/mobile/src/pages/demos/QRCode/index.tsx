import { Button, Input, View } from '@tarojs/components';
import React, { useRef, useState } from 'react';
import './global.scss';
import { QRCode as QRCodeComp, QRCodeRef } from '@/components';

definePageConfig({
  navigationBarTitleText: 'QRCode',
});
export default function QRCode() {
  const [text, setText] = useState('');
  const qrcodeRef = useRef<QRCodeRef>({} as any);
  const onRender = () => {
    qrcodeRef.current.render(text, {
      background: '#ffff00',
      foreground: '#ff00ff',
    });
  };
  const onPreview = () => {
    qrcodeRef.current.preview(false, text, {
      background: '#ffff00',
      foreground: '#ff00ff',
    });
  };
  return (
    <View style={{ width: '100vw', height: '100vh', padding: 40, boxSizing: 'border-box' }}>
      <QRCodeComp id="qrcode" width={300} height={300} ref={qrcodeRef} />
      <View>当前文本{text}</View>
      <View>
        输入：
        <Input
          value={text}
          onInput={e => setText(e.detail.value)}
          style={{ border: '1px solid #000' }}
        />
      </View>
      <View>
        <Button onClick={onRender}>render</Button>
        <Button onClick={onPreview}>preview</Button>
      </View>
    </View>
  );
}
