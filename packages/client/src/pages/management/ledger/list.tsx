import { request } from '@bestlyg/common/idl/utils';
import { Prisma } from '@bestlyg/data/prisma-client';
import React from 'react';
import dayjs from 'dayjs';
import { Calendar } from '@/shadcn/ui/calendar';
import { PageParam, PageData } from '@bestlyg/common';
import { Table } from 'antd';
import { useRequest } from 'ahooks';
import { useSetAtom } from 'jotai/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shadcn/ui/card';
import { summaryNodeAtom } from '@/components/app-summary';

export type Ledger = Prisma.LedgerGetPayload<{}>;

async function fetchLedgers({
    pageParam,
    param,
}: {
    pageParam: PageParam;
    param: { date?: Date };
}): Promise<PageData<Ledger> | null> {
    const data = await request({
        url: '/api/data/ledger/page',
        method: 'get',
        data: {
            current: pageParam.current,
            pageSize: pageParam.pageSize,
            date: param.date ? dayjs(param.date).format('YYYY-MM-DD') : undefined,
        },
        serializer: 'json',
    });
    return PageData.from(data);
}

async function fetchLedgerSummary(): Promise<{
    balance: {
        breakfastWallet: {
            total: number;
            cost: number;
        };
        lunchWallet: {
            total: number;
            cost: number;
        };
        dinnerWallet: {
            total: number;
            cost: number;
        };
    };
} | null> {
    const data = await request({
        url: '/api/data/ledger/summary',
        method: 'get',
        data: {},
        serializer: 'json',
    });
    return data;
}

function LedgerSummary() {
    const { data } = useRequest(fetchLedgerSummary);
    const toPrice = (price?: number) => (price ?? 0) / 100;
    const walletList = [
        { label: '早餐月月包', key: 'breakfastWallet' },
        { label: '中饭菜钱包', key: 'lunchWallet' },
        { label: '晚餐小荷包', key: 'dinnerWallet' },
    ] as const;
    return (
        <div className="flex flex-col gap-2">
            {walletList.map(({ label, key }) => (
                <Card className="w-full" key={key}>
                    <CardHeader>
                        <CardTitle>{label}</CardTitle>
                        <CardDescription>总数：{toPrice(data?.balance[key].total)}元</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>消耗：{toPrice(data?.balance[key].cost)}元</div>
                        <div>
                            剩余：
                            {toPrice(data?.balance[key].total) - toPrice(data?.balance[key].cost)}元
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* {list
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
                ))} */}
        </div>
    );
}

export default function LedgerList() {
    const [pageParam, setPageParam] = React.useState(new PageParam(1, 5));
    const [param, setParam] = React.useState<{ date?: Date }>({ date: new Date() });
    const { data } = useRequest(() => fetchLedgers({ pageParam, param }), {
        refreshDeps: [pageParam, param],
    });
    const list = data?.getList();
    const total = data?.getTotal();

    const setSummaryNode = useSetAtom(summaryNodeAtom);
    React.useEffect(() => {
        setSummaryNode(<LedgerSummary />);
    }, []);
    return (
        <div className="rounded-md border flex flex-col gap-4">
            <div>
                <Calendar
                    mode="single"
                    selected={param.date}
                    onSelect={date => {
                        setPageParam(new PageParam(1, 5));
                        setParam({ ...param, date });
                    }}
                    className="rounded-md"
                />
            </div>
            <Table
                rowKey="id"
                dataSource={list}
                columns={[
                    {
                        dataIndex: 'date',
                        width: 100,
                        title: '日期',
                        render: data => dayjs(data).format('YYYY-MM-DD'),
                    },
                    {
                        dataIndex: 'comment',
                        title: '用途',
                        width: 200,
                    },
                    {
                        dataIndex: 'balance',
                        title: '金额',
                        align: 'right',
                        render: (_, row) => (
                            <div className="text-right">
                                {(row.balance / 100) * (row.io ? 1 : -1) + '元'}
                            </div>
                        ),
                        width: 100,
                    },
                ]}
                pagination={{
                    total,
                    pageSize: pageParam.pageSize,
                    current: pageParam.current,
                    onChange: (current, pageSize) => setPageParam(new PageParam(current, pageSize)),
                }}
            />
        </div>
    );
}
