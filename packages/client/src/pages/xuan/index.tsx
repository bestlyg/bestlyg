import { Suspense } from '@/components/suspense';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { fetch } from '@bestlyg/common/idl/utils';
import { ChartTooltip, ChartTooltipContent } from '@/shadcn/ui/chart';
import { prismaClient } from '@bestlyg/data';
import { ChartLegend, ChartLegendContent } from '@/shadcn/ui/chart';
import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/shadcn/ui/chart';
import dayjs from 'dayjs';
import { RandomIcon } from '@/components/random-icon';

const chartConfig = {
    desktop: {
        label: 'Desktop',
        icon: RandomIcon,
        // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
        color: '#2563eb',
        // OR a theme object with 'light' and 'dark' keys
        // theme: {
        //   light: "#2563eb",
        //   dark: "#dc2626",
        // },
    },
    mobile: {
        label: 'Mobile',
        icon: RandomIcon,
        // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
        color: '#2563eb',
        // OR a theme object with 'light' and 'dark' keys
        // theme: {
        //   light: "#2563eb",
        //   dark: "#dc2626",
        // },
    },
} satisfies ChartConfig;

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
    const lineChartData = React.useMemo(
        () =>
            data
                .toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(v => ({ ...v, weight: v.weight ? v.weight / 100 : v.weight })),
        [data],
    );

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={value => dayjs(value).format('MM-DD')}
                />
                <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />

                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            labelFormatter={label => dayjs(label).format('YYYY-MM-DD')}
                        />
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />

                <Line type="monotone" dataKey="weight" stroke="#8884d8" dot={false} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ChartContainer>
    );
}

export function Xuan() {
    const [promise] = React.useState(fetchXuan);
    return <Suspense fallback={<XuansSkeleton />} promise={promise} Component={XuanChart} />;
}
