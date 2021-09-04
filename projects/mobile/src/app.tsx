import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'promise-prototype-finally';
import Taro from '@tarojs/taro';
import { store, rootKey } from './store';
import './app.scss';
import { getStorage } from './utils';

export default class App extends Component {
  updateLocation(location: [number, number]) {
    store.dispatch({
      type: rootKey.global.SET_LOCATION,
      payload: location,
    });
  }
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
    // 小程序加载时读取缓存值
    Object.values(rootKey).forEach(npKey =>
      Object.values(npKey).forEach((type: string) => {
        const [payload] = getStorage([type]);
        payload && store.dispatch({ type, payload });
      })
    );
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
      .then(({ latitude, longitude }) => this.updateLocation([latitude, longitude]));
    Taro.onLocationChange(res => this.updateLocation([res.latitude, res.longitude]));
  }
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
