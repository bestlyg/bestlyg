export enum LedgerRecordItemType {
    generally = '一般',
    drinks = '酒水饮料',
    food = '餐饮',
    transportation = '交通',
    redEnvelope = '红包',
    taobao = '淘宝',
    rent = '房租',
    phoneBill = '话费',
    dailyNecessities = '生活用品',
    drug = '药品',
    buyGroceries = '买菜',
    movie = '电影',
    snack = '零食',
    fruit = '水果',
    clothesShoesBags = '衣服鞋包',
    skinMakeup = '护肤彩妆',
    salary = '工资',
}
export interface LedgerRecordItem {
    io: 1 | -1;
    type: LedgerRecordItemType;
    money: number;
    comment: string;
}
export interface LedgerBaseRecord<T> {
    date: string;
    record: T[];
}
export interface LedgerDayRecord extends LedgerBaseRecord<LedgerRecordItem> {}

export interface LedgerMonthRecord extends LedgerBaseRecord<LedgerDayRecord> {}

export interface LedgerYearRecord extends LedgerBaseRecord<LedgerMonthRecord> {}

export type Ledger = LedgerYearRecord[];
