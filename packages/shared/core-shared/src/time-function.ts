/**
 * 日期提参的格式
 */
/** 相对时间计算的函数，4选1 */
export type RelativeTimeFunction =
    | { type: 'recentDays'; days: number }
    | { type: 'recentMonths'; months: number }
    | { type: 'recentQuarters'; quarters: number }
    | { type: 'recentYears'; years: number };
/** 绝对时间计算的函数，4选1 */
export type SpecificTimeFunction =
    | { type: 'specificDate'; year: number; month: number; day: number }
    | { type: 'specificMonth'; year: number; month: number }
    | { type: 'specificQuarter'; year: number; quarter: number }
    | { type: 'specificYear'; year: number };
/** 时间计算函数的类型 */
export type TimeFunction = RelativeTimeFunction | SpecificTimeFunction;
