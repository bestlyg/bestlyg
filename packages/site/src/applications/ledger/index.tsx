// import { ledger, LEDGER_FORMAT_DAY, LEDGER_FORMAT_MONTH } from '@bestlyg/data';
import { prismaClient } from '@bestlyg/data';
import { request } from '@site/src/utils';
import { useRequest } from 'ahooks';
import type { CalendarProps } from 'antd';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import _ from 'lodash';

function ioToNum(io: boolean) {
    return io ? 1 : -1;
}

export function Ledger() {
    const { data } = useRequest<prismaClient.Ledger[], any>(async () =>
        request('/api/data/ledger'),
    );

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const monthCellRender = (value: Dayjs) => {
        const arr = data?.filter(v => dayjs(v.date).diff(value, 'month') === 0) ?? [];
        return (
            <div>
                <section>
                    {(_.sum(arr.flatMap(v => ioToNum(v.io) * v.balance)) / 100).toFixed(2)}
                </section>
            </div>
        );
    };
    const dateCellRender = (value: Dayjs) => {
        const arr = data?.filter(v => dayjs(v.date).diff(value, 'day') === 0) ?? [];
        if (arr.length === 0) return null;

        return (
            <ul>
                <li>{`总${(_.sumBy(arr, item => item.balance * ioToNum(item.io)) / 100).toFixed(2)}元`}</li>
                {arr.map((item, i) => (
                    <li
                        key={i}
                    >{`${((item.balance * ioToNum(item.io)) / 100).toFixed(2)}元 ${item.comment}`}</li>
                ))}
            </ul>
        );
    };
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return <Calendar onPanelChange={onPanelChange} cellRender={cellRender} />;
}
