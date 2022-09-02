import { Page } from '@/app.config';
import { useStore } from '@/store';
import { getPageUrl } from '@/utils';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtGrid } from 'taro-ui';
import { AtGridItem } from 'taro-ui/types/grid';
import './global.scss';

const apps: AtGridItem[] = [
  {
    value: '小李小叶港',
    page: Page.Apps_Gang,
    iconInfo: {
      value: 'edit',
      size: '30',
      color: '#F00',
    },
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
