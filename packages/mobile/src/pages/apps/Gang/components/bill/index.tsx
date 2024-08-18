import { Page } from '@/app.config';
import { getPageUrl } from '@/utils';
import { Button, View } from '@tarojs/components';
import * as dayjs from 'dayjs';
import { Item } from 'taro-ui/types/timeline';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtTimeline } from 'taro-ui';
import { Bill as TBill, Type } from '../../models';
import styles from './styles.module.scss';

export function Bill({ bills, types }: { bills: TBill[]; types: Type[] }) {
    const billList = React.useMemo(() => {
        const cache: Record<string, TBill[]> = {};
        for (const item of bills) {
            const key = dayjs(item.date).format('YYYY-MM-DD');
            if (!cache[key]) cache[key] = [];
            cache[key].push(item);
        }
        return Object.entries(cache).sort(
            ([k1], [k2]) => new Date(k2).getTime() - new Date(k1).getTime(),
        );
    }, [bills]);
    return (
        <View className={styles.container}>
            {billList.map(([k, v]) => (
                <BillItem key={k} bills={v} date={k} types={types} />
            ))}
            <Button
                className={styles.add}
                onClick={() => Taro.navigateTo({ url: getPageUrl(Page.Apps_Gang_OpBill) })}
            >
                添加
            </Button>
        </View>
    );
}

function BillItem({ bills, date, types }: { bills: TBill[]; date: string; types: Type[] }) {
    const items: Item[] = bills.map(v => ({
        title: `${v.money / 100}`,
        content: [types?.find(t => t._id === v.typeId)?.name ?? '无类型', v.desc, v.remark],
    }));
    return (
        <View className={styles.billitem}>
            <View className={styles.billitem_title}>{date}</View>
            <AtTimeline pending items={items}></AtTimeline>
        </View>
    );
}
