import * as echarts from 'echarts';
// import { xuanDataList } from '@bestlyg/data';
import { useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { useRequest as getRequestFn } from '@site/src/utils';
import { prismaClient } from '@bestlyg/data';
import dayjs from 'dayjs';

export function Weights() {
    const request = getRequestFn();
    const { data } = useRequest<prismaClient.Xuan[], any>(async () => request('/api/data/xuan'));
    const containerRef = useRef<HTMLDivElement>();
    useEffect(() => {
        if (!data || data.length === 0) return;
        const chart = echarts.init(containerRef.current);
        const option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: data
                    .sort((v1, v2) => dayjs(v2.date).unix() - dayjs(v1.date).unix())
                    .filter(v => v.weight)
                    .map(v => dayjs(v.date).format('YYYY-MM-DD'))
                    .reverse(),
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
                    data: data
                        .sort((v1, v2) => dayjs(v2.date).unix() - dayjs(v1.date).unix())
                        .filter(v => v.weight)
                        .map(v => v.weight / 100)
                        .reverse(),
                    type: 'line',
                },
            ],
        };
        chart.setOption(option);
    }, [data]);
    return <div style={{ width: '100%', height: 600 }} ref={containerRef} />;
}
