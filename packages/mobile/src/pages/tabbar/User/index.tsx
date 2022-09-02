import Taro from '@tarojs/taro';
import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useCreation } from 'ahooks';
import { AtButton, AtAvatar } from 'taro-ui';
import { setStorage } from '@/utils';
import { useStore } from '@/store';
import { login } from './api';
import './global.scss';

definePageConfig({
  navigationBarTitleText: '我的',
});
export default function User() {
  const { dispatch, actions, state } = useStore(state => state.global);
  const data = useCreation(() => ({ code: '', encryptedData: '', iv: '' }), []);
  Taro.useDidShow(() => {
    Taro.login().then(res => {
      data.code = res.code;
    });
  });
  const onLogin = () => {
    Taro.getUserProfile({ desc: '获取用户信息' }).then(res => {
      data.encryptedData = res.encryptedData;
      data.iv = res.iv;
      return dispatch(actions.global.login(data));
    });
  };
  const onLogout = () => dispatch(actions.global.reset());
  return (
    <View>
      {state.login ? (
        <View className="at-article">
          <View className="at-article__h1">用户信息</View>
          <View className="at-article__info">
            <AtAvatar image={state.avatar} text={state.name}></AtAvatar>
          </View>
          <View className="at-article__info">昵称：{state.name}</View>
          <View className="at-article__info">
            性别：{state.gender === 0 ? '男' : state.gender === 1 ? '女' : '未知'}
          </View>
          <AtButton type="primary" onClick={onLogout}>
            退出登陆
          </AtButton>
        </View>
      ) : (
        <AtButton type="primary" onClick={onLogin}>
          登陆
        </AtButton>
      )}
    </View>
  );
}
