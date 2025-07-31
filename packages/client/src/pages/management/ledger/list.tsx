import React from 'react';
import dayjs from 'dayjs';
import { Calendar } from '@/shadcn/ui/calendar';
import { PageParam, PageData } from '@bestlyg/common';
import { Table } from 'antd';
import { useRequest } from 'ahooks';
import { request } from '@/utils';
import { Ledger } from '@bestlyg/server/type/index.ts';

async function fetchLedgers({
    pageParam,
    param,
}: {
    pageParam: PageParam;
    param: { date?: Date };
}): Promise<PageData<Ledger> | null> {
    const data = await request({
        url: '/api/database/ledger/page',
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

export default function LedgerList() {
    const [pageParam, setPageParam] = React.useState(new PageParam(1, 5));
    const [param, setParam] = React.useState<{ date?: Date }>({ date: new Date() });
    const { data, loading } = useRequest(() => fetchLedgers({ pageParam, param }), {
        refreshDeps: [pageParam, param],
    });
    const list = data?.getList();
    const total = data?.getTotal();
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
                loading={loading}
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
