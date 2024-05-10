import * as echarts from 'echarts';
import dayjs from 'dayjs';
import data from '@bestlyg/data/src/weights.json';
import { useRef, useEffect } from 'react';

export function Weights() {
    const containerRef = useRef<HTMLDivElement>();
    useEffect(() => {
        console.log('===> weights', data);
        const chart = echarts.init(containerRef.current);
        const option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: Object.keys(data).reverse(),
                name: '日期',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: true,
                },
            },
            yAxis: {
                type: 'value',
                name: '体重',
                axisLabel: {
                    formatter: '{value} KG',
                },
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: true,
                },
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 35,
                },
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                },
                {
                    type: 'inside',
                    yAxisIndex: [0],
                },
            ],
            series: [
                {
                    data: Object.values(data).reverse(),
                    type: 'line',
                    smooth: true,
                },
            ],
        };
        chart.setOption(option);
    }, []);
    return <div style={{ width: '100%', height: 600 }} ref={containerRef} />;
}
