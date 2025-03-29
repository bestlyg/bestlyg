import { Suspense } from '@/components/suspense';
import * as echarts from 'echarts';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { request } from '@bestlyg/common/idl/utils';
import { Prisma } from '@bestlyg/common/prisma-client';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shadcn/ui/card';
import { useSetAtom } from 'jotai';
import { summaryNodeAtom } from '@/components/app-layout';
import {
    getYearOnYear,
    getMonthOnMonth,
    getDayOnDay,
    getQuarterOnQuarter,
    getHalfYearOnHalfYear,
    apiMap,
} from '@bestlyg/common';

export type XuanData = Prisma.XuanGetPayload<{}>;

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
    const data = await request({
        url: apiMap.XuanController.getXuanList.path,
        method: apiMap.XuanController.getXuanList.method,
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

function XuanSummary({ promise }: { promise: ReturnType<typeof fetchXuan> }) {
    const data = React.use(promise) ?? [];
    const F = 'YYYY-MM-DD';
    const { map, now, yoy, mom, dod, qoq, hyohy } = React.useMemo(() => {
        const map: Record<string, XuanData> = {};
        for (const item of data) {
            map[dayjs(item.date).format(F)] = item;
        }
        const now = dayjs();
        const yoy = getYearOnYear(now);
        const mom = getMonthOnMonth(now);
        const dod = getDayOnDay(now);
        const qoq = getQuarterOnQuarter(now);
        const hyohy = getHalfYearOnHalfYear(now);
        return { map, now, yoy, mom, dod, qoq, hyohy };
    }, [data]);
    function formatWeight(day1: dayjs.Dayjs, day2: dayjs.Dayjs) {
        const date1 = map[day1.format(F)];
        const date2 = map[day2.format(F)];
        const offset = (date1.weight! - date2.weight!) / 100;
        if (offset === 0) return '无变化';
        return `${offset > 0 ? '增加了' : offset < 0 ? '减少了' : ''}${Math.abs(offset)}公斤`;
    }
    const list = [
        { date: dod, label: '日环比' },
        { date: mom, label: '月环比' },
        { date: qoq, label: '季环比' },
        { date: hyohy, label: '半年环比' },
        { date: yoy, label: '同比' },
    ];
    if (!map[now.format(F)]?.weight) return null;
    return (
        <div className="flex flex-col gap-2">
            {list
                .filter(({ date }) => map[date.format(F)]?.weight)
                .map(({ date, label }) => (
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>{label}</CardTitle>
                            <CardDescription>
                                {now.format(F)}相比于{date.format(F)}的数据
                            </CardDescription>
                        </CardHeader>
                        <CardContent>{formatWeight(now, date)}</CardContent>
                    </Card>
                ))}
        </div>
    );
}

export default function Xuan() {
    const [promise] = React.useState(fetchXuan);
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNode(
            <Suspense fallback={<XuansSkeleton />} promise={promise} Component={XuanSummary} />,
        );
    }, []);
    return <Suspense fallback={<XuansSkeleton />} promise={promise} Component={XuanChart} />;
}
