import { LedgerRecordItemType } from './types';
import dayjs from 'dayjs';

export const LEDGER_FORMAT_YEAR = 'YYYY';
export const LEDGER_FORMAT_MONTH = 'YYYY-MM';
export const LEDGER_FORMAT_DAY = 'YYYY-MM-DD';

export const ledgerRecordItemTypeData: Record<LedgerRecordItemType, { label: string }> = {
    [LedgerRecordItemType.Generally]: { label: '一般' },
    [LedgerRecordItemType.Drinks]: { label: '酒水饮料' },
    [LedgerRecordItemType.Food]: { label: '餐饮' },
    [LedgerRecordItemType.Transportation]: { label: '交通' },
    [LedgerRecordItemType.RedEnvelope]: { label: '红包' },
    [LedgerRecordItemType.Taobao]: { label: '淘宝' },
    [LedgerRecordItemType.Rent]: { label: '房租' },
    [LedgerRecordItemType.PhoneBill]: { label: '话费' },
    [LedgerRecordItemType.DailyNecessities]: { label: '生活用品' },
    [LedgerRecordItemType.Drug]: { label: '药品' },
    [LedgerRecordItemType.BuyGroceries]: { label: '买菜' },
    [LedgerRecordItemType.Movie]: { label: '电影' },
    [LedgerRecordItemType.Snack]: { label: '零食' },
    [LedgerRecordItemType.Fruit]: { label: '水果' },
    [LedgerRecordItemType.ClothesShoesBags]: { label: '衣服鞋包' },
    [LedgerRecordItemType.SkinMakeup]: { label: '护肤彩妆' },
    [LedgerRecordItemType.Salary]: { label: '工资' },
};

export function toVarName(date: string | dayjs.Dayjs, type: 'year' | 'month' | 'day') {
    if (typeof date === 'string') date = dayjs(date);
    switch (type) {
        case 'year':
            return toYearVarName(date);
        case 'month':
            return toMonthVarName(date);
        case 'day':
            return toDayVarName(date);
    }
}

export function toYearVarName(date: string | dayjs.Dayjs) {
    if (typeof date === 'string') date = dayjs(date);
    return `ledgerYearRecord_${date.format(LEDGER_FORMAT_YEAR).replace(/-/g, '_')}`;
}

export function toMonthVarName(date: string | dayjs.Dayjs) {
    if (typeof date === 'string') date = dayjs(date);
    return `ledgerMonthRecord_${date.format(LEDGER_FORMAT_MONTH).replace(/-/g, '_')}`;
}

export function toDayVarName(date: string | dayjs.Dayjs) {
    if (typeof date === 'string') date = dayjs(date);
    return `ledgerDayRecord_${date.format(LEDGER_FORMAT_DAY).replace(/-/g, '_')}`;
}
