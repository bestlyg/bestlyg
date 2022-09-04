import { View } from '@tarojs/components';
import React from 'react';
import Taro from '@tarojs/taro';
import { getPageUrl } from '@/utils';
import { Page } from '@/app.config';
import './global.scss';

definePageConfig({
  navigationBarTitleText: '首页',
});
export default function Home() {
  Taro.useDidShow(() => {
    Taro.switchTab({ url: getPageUrl(Page.Tabbar_WorkBench) });
    // Taro.navigateTo({ url: getPageUrl(Page.Apps_Gang) });
  });
  return <View></View>;
}
