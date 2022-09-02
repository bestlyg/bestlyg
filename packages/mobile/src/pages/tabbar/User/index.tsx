import Taro from '@tarojs/taro';
import React from 'react';
import { View } from '@tarojs/components';
import { useCreation } from 'ahooks';
import { AtButton } from 'taro-ui';
import { login } from './api';
import './global.scss';

definePageConfig({
  navigationBarTitleText: '我的',
});
export default function User() {
  const data = useCreation(() => ({ code: '', encryptedData: '', iv: '' }), []);
  Taro.useDidShow(() => {
    Taro.login().then(res => {
      data.code = res.code;
      console.log(data);
    });
  });
  const onLogin = () => {
    Taro.getUserProfile({ desc: '获取用户信息' })
      .then(res => {
        data.encryptedData = res.encryptedData;
        data.iv = res.iv;
        return login(data);
      })
      .then(res => {
        console.log(res);
      });
  };
  return (
    <View>
      <AtButton type="primary" onClick={onLogin}>
        Login
      </AtButton>
    </View>
  );
}
