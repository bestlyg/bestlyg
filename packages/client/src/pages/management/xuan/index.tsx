import { Suspense } from '@/components/suspense';
import * as echarts from 'echarts';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { fetch } from '@bestlyg/common/idl/utils';
import { prismaClient } from '@bestlyg/data';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';

export type XuanData = prismaClient.Prisma.XuanGetPayload<{}>;

function XuansSkeleton() {
    const item = (
        <div className="flex flex-col space-y-3 px-[20px] py-[10px]">
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
                <Skeleton className="h-3 w-[80%]" />
            </div>
        </div>
    );
    return (
        <div className="mt-[40px]">
            {item}
            {item}
            {item}
        </div>
    );
}

async function fetchXuan(): Promise<XuanData[] | null> {
    const data = await fetch({
        url: '/api/data/xuan',
        method: 'get',
        data: {},
        serializer: 'json',
    });
    return data;
}

export function XuanChart({ promise }: { promise: ReturnType<typeof fetchXuan> }) {
    const data = React.use(promise) ?? [];
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const echartsRef = React.useRef<echarts.ECharts | null>(null);
    useEffect(() => {
        if (!data || data.length === 0) return;
        if (!echartsRef.current) echartsRef.current = echarts.init(containerRef.current);
        const option: echarts.EChartsOption = {
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
                        .map(v => v.weight! / 100)
                        .reverse(),
                    type: 'line',
                },
            ],
        };
        echartsRef.current.setOption(option);
    }, [data]);
    return <div style={{ width: '100%', height: 600 }} ref={containerRef} />;
}

export default function Xuan() {
    const [promise] = React.useState(fetchXuan);
    return <Suspense fallback={<XuansSkeleton />} promise={promise} Component={XuanChart} />;
}
