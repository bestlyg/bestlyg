import * as echarts from 'echarts';
import { ledger, LEDGER_FORMAT_DAY, LEDGER_FORMAT_MONTH } from '@bestlyg/data';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import { useRef, useEffect } from 'react';
import _ from 'lodash';

const yearRecordList = _.keyBy(ledger, 'date');
const monthRecordList = _.keyBy(
    ledger.flatMap(v => v.record),
    'date'
);
const dayRecordList = _.keyBy(
    ledger.flatMap(v => v.record.flatMap(v => v.record)),
    'date'
);

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const monthCellRender = (value: Dayjs) => {
    const data = monthRecordList[value.format(LEDGER_FORMAT_MONTH)];
    if (!data) return null;
    return (
        <div>
            <section>
                {(
                    _.sum(data.record.flatMap(v => v.record.flatMap(v => v.io * v.money))) / 100
                ).toFixed(2)}
            </section>
        </div>
    );
};
const dateCellRender = (value: Dayjs) => {
    const data = dayRecordList[value.format(LEDGER_FORMAT_DAY)];
    if (!data) return null;
    return (
        <ul>
            {data.record.map((item, i) => (
                <li key={i}>
                    <Badge
                        status="success"
                        text={`${((item.money * item.io) / 100).toFixed(2)} ${item.comment}`}
                    />
                </li>
            ))}
        </ul>
    );
};
const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
};
export function Ledger() {
    const containerRef = useRef<HTMLDivElement>();
    useEffect(() => {
        console.log(yearRecordList, monthRecordList, dayRecordList);
        /*
        const chart = echarts.init(containerRef.current);
        const option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: xuanDataList
                    .filter(v => v.weight)
                    .map(v => v.date)
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
                    data: xuanDataList
                        .filter(v => v.weight)
                        .map(v => v.weight)
                        .reverse(),
                    type: 'line',
                    smooth: true,
                },
            ],
        };
        chart.setOption(option);
        */
    }, []);
    return <Calendar onPanelChange={onPanelChange} cellRender={cellRender} />;
}
