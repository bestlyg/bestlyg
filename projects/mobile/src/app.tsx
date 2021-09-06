import React, { Component } from 'react';
import 'promise-prototype-finally';
import Taro from '@tarojs/taro';
import { global } from '@/store';
import './app.scss';

export default class App extends Component {
  onLaunch() {
    console.log('小程序加载成功');
    // 全局报错提示
    Taro.onError(err => {
      Taro.showToast({
        title: `程序出错，请联系管理员。`,
        icon: 'none',
      });
      console.error(err);
    });
    /** 获取经纬度 */
    Taro.getSetting()
      .then(({ authSetting }) => {
        if (!authSetting['scope.userLocation']) {
          return Taro.authorize({
            scope: 'scope.userLocation',
          });
        }
      })
      .then(() =>
        Taro.getLocation({
          type: 'wgs84',
        })
      )
      .then(({ latitude, longitude }) => {
        global.location = [latitude, longitude];
      });
    Taro.onLocationChange(({ latitude, longitude }) => {
      global.location = [latitude, longitude];
    });
  }
  render() {
    return <>{this.props.children}</>;
  }
}
