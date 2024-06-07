import { View, Button } from '@tarojs/components';
import React from 'react';
import Taro from '@tarojs/taro';
import { useOp } from '@/hooks';
import { getPageUrl } from '@/utils';
import { Page } from '@/app.config';
import './global.scss';

definePageConfig({
    navigationBarTitleText: '首页',
});
const demos = [
    { name: 'echarts', page: Page.Demos_ECharts },
    { name: 'store', page: Page.Demos_Store },
    { name: 'poster', page: Page.Demos_Poster },
    { name: 'opModal', page: Page.Demos_OpModal },
    { name: 'qrcode', page: Page.Demos_QRCode },
    { name: '专星跳BLE', page: Page.Demos_ZXT_BLE },
];
export default function Main() {
    const opProps = useOp();
    // useEffect(() => {
    //   Taro.navigateTo({ url: getPageUrl(Page.Demos_ZXT_BLE) });
    // }, []);
    return (
        <View>
            {demos.map(({ name, page }) => (
                <Button
                    key={name}
                    onClick={() => {
                        Taro.navigateTo({
                            url: getPageUrl(page),
                        });
                    }}
                >
                    {name}
                </Button>
            ))}
        </View>
    );
}
