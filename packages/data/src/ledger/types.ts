export enum LedgerRecordItemType {
    /** 一般 */
    Generally = 'Generally',
    /** 酒水饮料 */
    Drinks = 'Drinks',
    /** 餐饮 */
    Food = 'Food',
    /** 交通 */
    Transportation = 'Transportation',
    /** 红包 */
    RedEnvelope = 'RedEnvelope',
    /** 淘宝 */
    Taobao = 'Taobao',
    /** 房租 */
    Rent = 'Rent',
    /** 话费 */
    PhoneBill = 'PhoneBill',
    /** 生活用品 */
    DailyNecessities = 'DailyNecessities',
    /** 药品 */
    Drug = 'Drug',
    /** 买菜 */
    BuyGroceries = 'BuyGroceries',
    /** 电影 */
    Movie = 'Movie',
    /** 零食 */
    Snack = 'Snack',
    /** 水果 */
    Fruit = 'Fruit',
    /** 衣服鞋包 */
    ClothesShoesBags = 'ClothesShoesBags',
    /** 护肤彩妆 */
    SkinMakeup = 'SkinMakeup',
    /** 工资 */
    Salary = 'Salary',
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
