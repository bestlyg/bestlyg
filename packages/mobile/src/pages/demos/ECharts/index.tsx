// import { EChart, EChartRef } from '@/components';
import { View } from '@tarojs/components';
import { useInterval } from 'ahooks';
import React from 'react';
import { useEffect, useRef } from 'react';
import './global.scss';

definePageConfig({
    navigationBarTitleText: 'ECharts 演示',
});

const opt = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)',
            },
        },
    ],
};
export default function EChartsDemo() {
    // const chartRef = useRef<EChartRef>(null as any);
    // useEffect(() => {
    //   if (!chartRef.current) return;
    //   chartRef.current.refresh(opt);
    // }, []);
    // useInterval(() => {
    //   if (!chartRef.current) return;
    //   const newOpt = { ...opt };
    //   newOpt.series[0].data = newOpt.series[0].data.map(v => v + Math.floor(Math.random() * 10 - 5));
    //   chartRef.current.setOption(newOpt);
    // }, 1000);
    return (
        <View style={{ width: '100vw', height: '100vh' }}>
            {/* <EChart ref={chartRef} canvasId="chart-canvas" /> */}
        </View>
    );
}
