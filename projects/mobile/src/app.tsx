import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'promise-prototype-finally';
import Taro from '@tarojs/taro';
import { getStore } from './store';
import './app.scss';

const store = getStore();
export default class App extends Component {
  onLaunch() {
    console.log('小程序加载成功');
    Taro.onError(err => {
      Taro.showToast({
        title: `程序出错，请联系管理员。\n${(err ?? '').toString()}`,
        icon: 'none',
      });
    });
  }
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
