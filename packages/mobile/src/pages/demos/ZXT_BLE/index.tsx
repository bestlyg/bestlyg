import { useStore } from '@/store';
import { Button, View } from '@tarojs/components';
import { useCreation } from 'ahooks';
import React, { useEffect } from 'react';
import './global.scss';
import { BLE } from './utils';

definePageConfig({
    navigationBarTitleText: '专星跳BLE 演示',
});
const ble = new BLE();

export default function ZXT_BLE() {
    useEffect(() => {
        console.log(ble);
    }, []);
    return (
        <View style={{ width: '100vw', height: '100vh' }}>
            <Button onClick={ble.onStartAdapter}>打开适配器</Button>
            <Button onClick={ble.onCloseAdapter}>关闭适配器</Button>
            <Button onClick={ble.onStartDiscovery}>开始搜索</Button>
            <Button onClick={ble.onCloseDiscovery}>关闭搜索</Button>
            <Button onClick={ble.getDevice}>获取设备</Button>
            <Button onClick={ble.getConnectedDevice}>获取已连接设备</Button>
            <Button onClick={ble.onConnectDevice}>连接我的设备</Button>
            <Button onClick={ble.getService}>获取服务</Button>
            <Button onClick={ble.getCharacteristics}>获取特征值</Button>
            <Button onClick={ble.onRead}>读取值</Button>
            <Button onClick={ble.onNotify}>开启notify</Button>
            {/* <Button onClick={onStartwrite}>写数据</Button> */}
            <Button onClick={() => ble.onWrite(BLE.W_CNT)}>到计数</Button>
            <Button onClick={() => ble.onWrite(BLE.W_TIME)}>倒计时</Button>
            <Button onClick={() => ble.onWrite(BLE.W_FREE)}>自由跳</Button>
            <Button onClick={() => ble.onWrite(BLE.W_CHALLENGE)}>挑战者</Button>
            <Button onClick={() => ble.onWrite(BLE.W_SYNC_TIME)}>同步时间</Button>
            <Button onClick={() => ble.onWrite(BLE.W_SYNC_HISTORY)}>同步历史记录</Button>
        </View>
    );
}
