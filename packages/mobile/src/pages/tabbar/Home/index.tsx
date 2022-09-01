import { View, Button } from '@tarojs/components';
import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { getPageUrl } from '@/utils';
import { Page } from '@/app.config';
import './global.scss';

definePageConfig({
  navigationBarTitleText: '首页',
});
export default function Home() {
  useEffect(() => {
    Taro.switchTab({ url: getPageUrl(Page.Tabbar_WorkBench) });
    // Taro.navigateTo({ url: getPageUrl(Page.Demos_Main) });
  }, []);
  return <View>1</View>;
}
