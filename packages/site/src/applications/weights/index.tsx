import * as echarts from 'echarts';
import { weights } from '@bestlyg/data';
import { useRef, useEffect } from 'react';

export function Weights() {
    const containerRef = useRef<HTMLDivElement>();
    useEffect(() => {
        const chart = echarts.init(containerRef.current);
        const option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: Object.keys(weights).reverse(),
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
                    data: Object.values(weights).reverse(),
                    type: 'line',
                    smooth: true,
                },
            ],
        };
        chart.setOption(option);
    }, []);
    return <div style={{ width: '100%', height: 600 }} ref={containerRef} />;
}
