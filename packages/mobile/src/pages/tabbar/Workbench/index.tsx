import { Page } from '@/app.config';
import { useStore } from '@/store';
import { getPageUrl } from '@/utils';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtGrid } from 'taro-ui';
import './global.scss';

const apps = [
  {
    image:
      'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value: '小李小叶港',
    page: Page.Apps_Gang,
  },
];

definePageConfig({
  navigationBarTitleText: '工作台',
});
export default function Workbench() {
  const { state } = useStore(state => state.global.login);
  Taro.useDidShow(() => {
    if (!state) Taro.switchTab({ url: getPageUrl(Page.Tabbar_User) });
  });
  return <AtGrid onClick={e => Taro.navigateTo({ url: getPageUrl(e.page) })} data={apps} />;
}
