import { Button, View } from '@tarojs/components';
import React, { useRef, useState } from 'react';
import './global.scss';
import { Poster as PosterComp, PosterRef } from 'taro-poster-render';
import Taro from '@tarojs/taro';

definePageConfig({
  navigationBarTitleText: 'Poster 演示',
});
export default function Poster() {
  const poster = useRef<PosterRef>(null);
  const [visible, setVisible] = useState(false);
  const render = () => setVisible(!visible);
  const preview = () => poster.current?.preview();
  const savePosterToPhoto = () => poster.current?.savePosterToPhoto();
  return (
    <View style={{ width: '100vw', height: '100vh' }}>
      <Button onClick={render}>{visible ? 'UnRender' : 'Render'}</Button>
      <Button onClick={preview}>preview</Button>
      <Button onClick={savePosterToPhoto}>savePosterToPhoto</Button>
      {visible && (
        <PosterComp
          style={{ marginLeft: Taro.pxTransform(55), display: 'none' }}
          width={644}
          height={1104}
          ref={poster}
          debug
          quality={1}
          showMenuByLongpress
          renderType="image"
          downloadLimit={10}
          onLongPress={() => poster.current?.preview()}
          onRender={url => console.log('onRender', url)}
          onSave={url => console.log('onSave', url)}
          list={[
            {
              type: 'image',
              x: 0,
              y: 0,
              width: 644,
              height: 1104,
              mode: 'cover',
              src: 'https://img.1000.com/shumou/interaction/bg3.png',
              radius: 16,
            },
            {
              type: 'image',
              x: 294,
              y: 30,
              width: 96,
              height: 96,
              radius: 48,
              src: 'https://img.1000.com/shumou/interaction/avatar.png',
            },
            // 这里的文字与下一个文字要联动居中
            {
              type: 'text',
              x: (textWidth, instance) =>
                (644 - textWidth - instance.measureTextWidth('的助力邀请')) / 2,
              y: 180,
              width: textWidth => textWidth,
              height: 30,
              text: '中二猪猪猪猪猪猪',
              color: '#fff',
              fontSize: 28,
              textAlign: 'left',
              baseLine: 'normal',
            },
            {
              type: 'text',
              x: (textWidth, instance) =>
                (644 - textWidth - instance.measureTextWidth('中二猪猪猪猪猪猪')) / 2 +
                instance.measureTextWidth('中二猪猪猪猪猪猪') +
                10,
              y: 180,
              width: 200,
              height: 30,
              text: '的助力邀请',
              color: '#FEEE93',
              fontSize: 28,
              baseLine: 'normal',
            },
            {
              type: 'image',
              x: 70,
              y: 240,
              width: 508,
              height: 68,
              src: 'https://img.1000.com/shumou/interaction/text.png',
            },
            {
              type: 'shape',
              x: 22,
              y: 760,
              width: 600,
              height: 320,
              fillStyle: '#fff',
              radius: 20,
              strokeStyle: '#000',
              lineWidth: 10,
            },
            {
              type: 'shape',
              x: 100,
              y: 800,
              width: 100,
              height: 100,
              fillStyle: 'red',
              radius: 50,
              strokeStyle: 'yellow',
              lineWidth: 10,
            },
            {
              type: 'image',
              x: 60,
              y: 380,
              sx: 0,
              sy: 0,
              width: 400,
              height: 300,
              backgroundColor: 'red',
              mode: 'cover',
              src: 'https://img.1000.com/shumou/interaction/img2.png',
            },
          ]}
        />
      )}
    </View>
  );
}