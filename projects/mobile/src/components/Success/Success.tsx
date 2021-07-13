import { View, Image, Button } from '@tarojs/components';
import { assets } from '@/utils';
import React from 'react';
import Taro from '@tarojs/taro';
import './Success.scss';

export default function Success({
  bgColor = '#ffffff',
  title,
  btnTitle,
}: {
  bgColor?: string;
  title: string;
  btnTitle: string;
}) {
  return (
    <View className="success" style={{ backgroundColor: bgColor }}>
      <View className="global-center success_image">
        <Image src={assets.success}></Image>
      </View>
      <View className="global-center success_title">{title}</View>
      <View className="global-center success_btn">
        <Button className="global-center" onClick={() => Taro.navigateBack()}>
          {btnTitle}
        </Button>
      </View>
    </View>
  );
}
