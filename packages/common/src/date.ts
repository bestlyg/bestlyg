import dayjs from 'dayjs';

// 获取同比日期
export function getYearOnYear(date: dayjs.Dayjs) {
    return dayjs(date).subtract(1, 'year');
}
// 获取月环比日期
export function getMonthOnMonth(date: dayjs.Dayjs) {
    return dayjs(date).subtract(1, 'month');
}
// 获取日环比日期
export function getDayOnDay(date: dayjs.Dayjs) {
    return dayjs(date).subtract(1, 'day');
}
// 获取季环比日期
export function getQuarterOnQuarter(date: dayjs.Dayjs) {
    return dayjs(date).subtract(3, 'month');
}
// 获取半年环比日期
export function getHalfYearOnHalfYear(date: dayjs.Dayjs) {
    return dayjs(date).subtract(6, 'month');
}